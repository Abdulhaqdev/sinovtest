"use client"

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://v1.backend.sinovtest.uz/api"
).replace(/\/$/, "")

const TOKENS_STORAGE_KEY = "auth_tokens"

type ApiError = {
  detail?: string
  message?: string
  [key: string]: unknown
}

type AuthTokens = {
  access: string
  refresh: string
  is_profile_complete?: boolean
}

type RefreshTokenResponse = {
  access: string
}

class ApiService {
  private baseUrl: string
  private isRefreshing = false
  private refreshPromise: Promise<string> | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getTokens(): AuthTokens | null {
    if (typeof window === "undefined") return null
    try {
      const tokens = localStorage.getItem(TOKENS_STORAGE_KEY)
      return tokens ? JSON.parse(tokens) : null
    } catch {
      return null
    }
  }

  private updateAccessToken(access: string): void {
    if (typeof window === "undefined") return
    try {
      const tokens = this.getTokens()
      if (tokens) {
        localStorage.setItem(
          TOKENS_STORAGE_KEY,
          JSON.stringify({ ...tokens, access })
        )
      }
    } catch (error) {
      console.error("Failed to update access token", error)
    }
  }

  private handleAuthError(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKENS_STORAGE_KEY)
    window.location.href = "/login"
  }

  private getAuthHeader(): Record<string, string> {
    const tokens = this.getTokens()
    return tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}
  }

  private async refreshAccessToken(): Promise<string> {
    // If already refreshing, return the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefreshing = true
    this.refreshPromise = (async () => {
      try {
        const tokens = this.getTokens()
        if (!tokens?.refresh) {
          throw new Error("No refresh token available")
        }

        const response = await fetch(`${this.baseUrl}/users/auth/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: tokens.refresh }),
        })

        if (!response.ok) {
          throw new Error("Failed to refresh token")
        }

        const data = (await response.json()) as RefreshTokenResponse
        this.updateAccessToken(data.access)
        return data.access
      } catch (error) {
        this.handleAuthError()
        throw error
      } finally {
        this.isRefreshing = false
        this.refreshPromise = null
      }
    })()

    return this.refreshPromise
  }

  async fetch<TResponse>(
    path: string,
    init?: RequestInit & { requiresAuth?: boolean }
  ): Promise<TResponse> {
    const { requiresAuth = false, ...fetchInit } = init ?? {}

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(requiresAuth ? this.getAuthHeader() : {}),
      ...(fetchInit.headers as Record<string, string> ?? {}),
    }

    let response = await fetch(`${this.baseUrl}/${path.replace(/^\//, "")}`, {
      ...fetchInit,
      headers,
      cache: "no-store",
    })

    // If 401 and requires auth, try to refresh token
    if (response.status === 401 && requiresAuth) {
      try {
        const newAccessToken = await this.refreshAccessToken()
        
        // Retry request with new token
        response = await fetch(`${this.baseUrl}/${path.replace(/^\//, "")}`, {
          ...fetchInit,
          headers: {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
          cache: "no-store",
        })
      } catch (error) {
        // If refresh fails, redirect to login
        this.handleAuthError()
        throw new Error("Session expired. Please login again.")
      }
    }

    const data = (await response.json().catch(() => undefined)) as
      | ApiError
      | TResponse
      | undefined

    if (!response.ok) {
      const errorMessage =
        (data as ApiError | undefined)?.detail ||
        (data as ApiError | undefined)?.message ||
        "Noma'lum xato yuz berdi"
      throw new Error(errorMessage)
    }

    return data as TResponse
  }

  async get<TResponse>(path: string, requiresAuth = false): Promise<TResponse> {
    return this.fetch<TResponse>(path, { method: "GET", requiresAuth })
  }

  async post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    requiresAuth = false
  ): Promise<TResponse> {
    return this.fetch<TResponse>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      requiresAuth,
    })
  }

  async patch<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    requiresAuth = false
  ): Promise<TResponse> {
    return this.fetch<TResponse>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      requiresAuth,
    })
  }

  async put<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    requiresAuth = false
  ): Promise<TResponse> {
    return this.fetch<TResponse>(path, {
      method: "PUT",
      body: JSON.stringify(body),
      requiresAuth,
    })
  }

  async delete<TResponse>(path: string, requiresAuth = false): Promise<TResponse> {
    return this.fetch<TResponse>(path, { method: "DELETE", requiresAuth })
  }
}

export const apiService = new ApiService(API_BASE_URL)