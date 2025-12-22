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
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getTokens(): AuthTokens | null {
    try {
      const tokens = localStorage.getItem(TOKENS_STORAGE_KEY)
      return tokens ? JSON.parse(tokens) : null
    } catch {
      return null
    }
  }

  private getAuthHeader(): Record<string, string> {
    const tokens = this.getTokens()
    return tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}
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

    const response = await fetch(`${this.baseUrl}/${path.replace(/^\//, "")}`, {
      ...fetchInit,
      headers,
      cache: "no-store",
    })

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