<template>
  <div class="bg-dashboard rounded-lg border border-theme shadow-theme-lg">
    <!-- Header Section -->
    <div class="p-6 border-b border-subtle bg-surface rounded-t-lg">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-theme">{{ title }}</h2>
        <div class="flex items-center gap-3">
          <!-- Filter Toggle Button -->
          <button 
            @click="showFilters = !showFilters" 
            :class="[
              'px-4 py-2 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md',
              showFilters 
                ? 'bg-cmint-primary text-cmint-dark border border-cmint-primary shadow-lg' 
                : 'bg-card border border-subtle text-muted hover:bg-hover-surface hover:text-cmint-primary hover:border-cmint-primary'
            ]"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.73-4.8 5.75-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
            </svg>
            {{ showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros' }}
          </button>

          <!-- View Toggle Button -->
          <button 
            @click="viewMode = viewMode === 'table' ? 'cards' : 'table'"
            class="px-4 py-2 text-sm bg-card border border-subtle text-muted rounded-lg hover:bg-hover-surface hover:text-cmint-primary hover:border-cmint-primary transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
          >
            <svg v-if="viewMode === 'table'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3v8h8V3H3zM9 9H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
            </svg>
            {{ viewMode === 'table' ? 'Cards' : 'Tabla' }}
          </button>
        </div>
      </div>

      <!-- Filters Panel -->
      <div v-if="showFilters" class="bg-card border border-subtle rounded-xl p-6 animate-slide-in shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Data Types Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-cmint-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Tipos de Datos</label>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in availableDataTypes"
                :key="type"
                @click="toggleDataTypeFilter(type)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  selectedDataTypes.includes(type) 
                    ? getDataTypeBadgeClass(type, true) + ' ring-2 ring-offset-2 ring-offset-surface ring-current shadow-lg'
                    : 'bg-surface border border-subtle text-muted hover:bg-hover-surface hover:text-cmint-primary hover:border-cmint-primary hover:shadow-md'
                ]"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <!-- Risk Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-red" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Nivel de Riesgo</label>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="risk in availableRisks"
                :key="risk"
                @click="toggleRiskFilter(risk)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  selectedRisks.includes(risk) 
                    ? getRiskBadgeClass(risk, true) + ' ring-2 ring-offset-2 ring-offset-surface ring-current shadow-lg'
                    : 'bg-surface border border-subtle text-muted hover:bg-hover-surface hover:text-cmint-primary hover:border-cmint-primary hover:shadow-md'
                ]"
              >
                {{ risk }}
              </button>
            </div>
          </div>

          <!-- Status Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Estado</label>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="status in availableStatuses"
                :key="status"
                @click="toggleStatusFilter(status)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  selectedStatuses.includes(status) 
                    ? getStatusBadgeClass(status, true) + ' ring-2 ring-offset-2 ring-offset-surface ring-current shadow-lg'
                    : 'bg-surface border border-subtle text-muted hover:bg-hover-surface hover:text-cmint-primary hover:border-cmint-primary hover:shadow-md'
                ]"
              >
                {{ status }}
              </button>
            </div>
          </div>

          <!-- Sources Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-purple" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Fuentes</label>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="source in availableSources"
                :key="source"
                @click="toggleSourceFilter(source)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  selectedSources.includes(source) 
                    ? 'bg-purple text-white border border-purple shadow-lg ring-2 ring-offset-2 ring-offset-surface ring-purple'
                    : 'bg-surface border border-subtle text-muted hover:bg-hover-surface hover:text-purple hover:border-purple hover:shadow-md'
                ]"
              >
                {{ source.replace('-', ' ') }}
              </button>
            </div>
          </div>

          <!-- Hash Types Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Tipo de Hash</label>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="hashType in availableHashTypes"
                :key="hashType"
                @click="toggleHashTypeFilter(hashType)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  selectedHashTypes.includes(hashType) 
                    ? 'bg-orange text-white border border-orange shadow-lg ring-2 ring-offset-2 ring-offset-surface ring-orange'
                    : 'bg-surface border border-subtle text-muted hover:bg-hover-surface hover:text-orange hover:border-orange hover:shadow-md'
                ]"
              >
                {{ hashType }}
              </button>
            </div>
          </div>

          <!-- Date Filter -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <label class="text-sm font-semibold text-theme">Rango de Fechas</label>
            </div>
            <div class="space-y-3">
              <div class="relative">
                <input
                  v-model="dateFrom"
                  type="date"
                  placeholder="Fecha desde"
                  class="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-theme text-sm focus:border-cmint-primary focus:ring-2 focus:ring-cmint-primary focus:ring-opacity-20 focus:outline-none transition-all duration-200 hover:border-cmint-primary"
                />
                <label class="absolute -top-2 left-3 px-1 bg-card text-xs text-muted">Desde</label>
              </div>
              <div class="relative">
                <input
                  v-model="dateTo"
                  type="date"
                  placeholder="Fecha hasta"
                  class="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-theme text-sm focus:border-cmint-primary focus:ring-2 focus:ring-cmint-primary focus:ring-opacity-20 focus:outline-none transition-all duration-200 hover:border-cmint-primary"
                />
                <label class="absolute -top-2 left-3 px-1 bg-card text-xs text-muted">Hasta</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions Row -->
        <div class="flex items-center justify-between mt-6 pt-4 border-t border-subtle">
          <div class="flex items-center gap-3 text-sm text-muted">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
            </svg>
            <span>Filtros activos ajustarán los resultados automáticamente</span>
          </div>
          <button 
            @click="clearAllFilters"
            class="px-6 py-2 text-sm bg-gradient-to-r from-red to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="overflow-hidden">
      <!-- Table View -->
      <div v-if="viewMode === 'table'" class="overflow-x-auto">
        <table class="table-modern w-full min-w-full">
          <thead>
            <tr>
              <th class="text-left px-4 py-3">Usuario/Email</th>
              <th class="text-left px-4 py-3">Contraseña</th>
              <th class="text-left px-4 py-3">Hash/Texto</th>
              <th class="text-left px-4 py-3">Dominio</th>
              <th class="text-left px-4 py-3">Fuente</th>
              <th class="text-left px-4 py-3">Fecha</th>
              <th class="text-left px-4 py-3">Tipos de Datos</th>
              <th class="text-left px-4 py-3">Riesgo</th>
              <th class="text-left px-4 py-3">Estado</th>
              <th class="text-left px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="leak in paginatedLeaks" 
              :key="leak.id" 
              class="table-row-modern modern-table-row cursor-pointer" 
              @click="selectLeak(leak)"
            >
              <!-- Email -->
              <td class="px-4 py-3 text-theme font-medium">
                <div class="truncate max-w-48">
                  {{ leak.email }}
                </div>
              </td>

              <!-- Password -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span 
                    v-if="!passwordVisible[leak.id]" 
                    class="font-mono text-sm text-muted"
                  >
                    ••••••••••••
                  </span>
                  <span 
                    v-else 
                    class="font-mono text-sm text-cmint-primary max-w-32 truncate"
                  >
                    {{ leak.password }}
                  </span>
                  <div class="flex gap-1">
                    <!-- Toggle Password Visibility -->
                    <button 
                      @click.stop="togglePasswordVisibility(leak.id)" 
                      class="text-muted hover:text-cmint-primary transition-colors p-1 rounded-md hover:bg-hover-surface"
                    >
                      <svg v-if="!passwordVisible[leak.id]" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      </svg>
                    </button>
                    <!-- Copy Password -->
                    <button 
                      @click.stop="copyToClipboard(leak.password)" 
                      class="text-muted hover:text-cmint-primary transition-colors p-1 rounded-md hover:bg-hover-surface"
                    >
                      <svg v-if="!copiedPasswords[leak.id]" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                      <svg v-else class="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </td>

              <!-- Hash Type -->
              <td class="px-4 py-3 text-muted">
                {{ leak.hashType || 'Plain' }}
              </td>

              <!-- Domain -->
              <td class="px-4 py-3 text-blue font-medium">
                <div class="truncate max-w-40">
                  {{ leak.domain }}
                </div>
              </td>

              <!-- Source -->
              <td class="px-4 py-3 text-muted">
                <div class="truncate max-w-32">
                  {{ leak.source }}
                </div>
              </td>

              <!-- Date -->
              <td class="px-4 py-3 text-muted">
                {{ formatDate(leak.dateFound) }}
              </td>

              <!-- Data Types -->
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="type in leak.dataTypes" 
                    :key="type"
                    :class="getDataTypeBadgeClass(type)"
                    class="px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                  >
                    {{ type }}
                  </span>
                </div>
              </td>

              <!-- Risk -->
              <td class="px-4 py-3">
                <span 
                  :class="getRiskBadgeClass(leak.risk)" 
                  class="px-3 py-1 rounded-md text-xs font-medium"
                >
                  {{ leak.risk }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-4 py-3">
                <span 
                  :class="getStatusBadgeClass(leak.status)" 
                  class="px-3 py-1 rounded-md text-xs font-medium"
                >
                  {{ leak.status }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3">
                <div class="relative">
                  <button 
                    @click.stop="toggleActionMenu(leak.id)" 
                    class="text-muted hover:text-cmint-primary transition-colors p-2 rounded-md hover:bg-hover-surface"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                  
                  <!-- Action Menu -->
                  <div 
                    v-if="openActionMenus[leak.id]" 
                    class="absolute right-0 mt-2 bg-card-solid border border-theme rounded-lg shadow-theme-lg z-50 min-w-48 animate-slide-in"
                  >
                    <div class="py-1">
                      <button 
                        v-for="action in menuActions" 
                        :key="action.key"
                        @click="handleMenuAction(action.key, leak)" 
                        class="w-full text-left px-4 py-2 text-sm text-muted hover:bg-hover-surface hover:text-cmint-primary flex items-center gap-2 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path :d="action.iconPath"/>
                        </svg>
                        {{ action.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards View -->
      <div v-else class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="leak in paginatedLeaks" 
            :key="`card-${leak.id}`"
            class="bg-card border border-subtle rounded-lg p-4 hover:border-cmint-primary transition-all duration-200 cursor-pointer leak-card"
            @click="selectLeak(leak)"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-theme truncate">{{ leak.email }}</h3>
                <p class="text-xs text-blue mt-1">{{ leak.domain }}</p>
              </div>
              <div class="flex items-center gap-2 ml-2">
                <span 
                  :class="getRiskBadgeClass(leak.risk)" 
                  class="px-2 py-1 rounded-md text-xs font-medium"
                >
                  {{ leak.risk }}
                </span>
              </div>
            </div>

            <!-- Password Section -->
            <div class="mb-3 p-3 bg-surface rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-muted">Contraseña</span>
                <div class="flex gap-1">
                  <button 
                    @click.stop="togglePasswordVisibility(leak.id)" 
                    class="text-muted hover:text-cmint-primary transition-colors p-1 rounded-md hover:bg-hover-surface"
                  >
                    <svg v-if="!passwordVisible[leak.id]" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="copyToClipboard(leak.password)" 
                    class="text-muted hover:text-cmint-primary transition-colors p-1 rounded-md hover:bg-hover-surface"
                  >
                    <svg v-if="!copiedPasswords[leak.id]" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                    <svg v-else class="w-3 h-3 text-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <span 
                v-if="!passwordVisible[leak.id]" 
                class="font-mono text-sm text-muted"
              >
                ••••••••••••
              </span>
              <span 
                v-else 
                class="font-mono text-sm text-cmint-primary"
              >
                {{ leak.password }}
              </span>
            </div>

            <!-- Data Types -->
            <div class="mb-3">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="type in leak.dataTypes" 
                  :key="type"
                  :class="getDataTypeBadgeClass(type)"
                  class="px-2 py-1 rounded-md text-xs font-medium"
                >
                  {{ type }}
                </span>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="flex items-center justify-between text-xs text-muted border-t border-subtle pt-3">
              <div class="flex items-center gap-2">
                <span 
                  :class="getStatusBadgeClass(leak.status)" 
                  class="px-2 py-1 rounded-md text-xs font-medium"
                >
                  {{ leak.status }}
                </span>
                <span>{{ leak.source }}</span>
              </div>
              <span>{{ formatDate(leak.dateFound) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer with Pagination -->
    <div class="px-6 py-4 border-t border-subtle bg-surface rounded-b-lg">
      <div class="flex items-center justify-between text-sm text-muted">
        <span>Mostrando {{ startIndex }} a {{ endIndex }} de {{ filteredLeaks.length }} resultados</span>
        <div class="flex items-center gap-3">
          <button 
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm rounded border border-theme hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Anterior
          </button>
          
          <div class="flex items-center gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 text-sm rounded transition-all duration-200',
                page === currentPage 
                  ? 'bg-cmint-primary text-cmint-dark font-semibold' 
                  : 'border border-theme hover:bg-surface text-muted'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm rounded border border-theme hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Explorador de Filtraciones'
  },
  leaks: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['selectLeak', 'menuAction', 'filteredDataChanged'])

// Reactive state
const viewMode = ref('table')
const showFilters = ref(false)
const passwordVisible = reactive({})
const copiedPasswords = reactive({})
const openActionMenus = reactive({})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const selectedDataTypes = ref([])
const selectedRisks = ref([])
const selectedStatuses = ref([])
const selectedSources = ref([])
const selectedHashTypes = ref([])
const dateFrom = ref('')
const dateTo = ref('')

// Menu actions
const menuActions = [
  { 
    key: 'view', 
    label: 'Ver Detalles',
    iconPath: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
  },
  { 
    key: 'export', 
    label: 'Exportar',
    iconPath: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'
  }
]

// Computed properties
const availableDataTypes = computed(() => {
  const types = new Set()
  props.leaks.forEach(leak => {
    if (leak.dataTypes && Array.isArray(leak.dataTypes)) {
      leak.dataTypes.forEach(type => types.add(type))
    }
  })
  return Array.from(types)
})

const availableRisks = computed(() => {
  const risks = new Set()
  props.leaks.forEach(leak => {
    if (leak.risk) risks.add(leak.risk)
  })
  return Array.from(risks)
})

const availableStatuses = computed(() => {
  const statuses = new Set()
  props.leaks.forEach(leak => {
    if (leak.status) statuses.add(leak.status)
  })
  return Array.from(statuses)
})

const availableSources = computed(() => {
  const sources = new Set()
  props.leaks.forEach(leak => {
    if (leak.source) sources.add(leak.source)
  })
  return Array.from(sources)
})

const availableHashTypes = computed(() => {
  const hashTypes = new Set()
  props.leaks.forEach(leak => {
    if (leak.hashType) hashTypes.add(leak.hashType)
  })
  return Array.from(hashTypes)
})

const filteredLeaks = computed(() => {
  return props.leaks.filter(leak => {
    // Data types filter
    if (selectedDataTypes.value.length > 0) {
      const hasSelectedType = leak.dataTypes?.some(type => 
        selectedDataTypes.value.includes(type)
      )
      if (!hasSelectedType) return false
    }

    // Risk filter
    if (selectedRisks.value.length > 0) {
      if (!selectedRisks.value.includes(leak.risk)) return false
    }

    // Status filter
    if (selectedStatuses.value.length > 0) {
      if (!selectedStatuses.value.includes(leak.status)) return false
    }

    // Sources filter
    if (selectedSources.value.length > 0) {
      if (!selectedSources.value.includes(leak.source)) return false
    }

    // Hash types filter
    if (selectedHashTypes.value.length > 0) {
      if (!selectedHashTypes.value.includes(leak.hashType)) return false
    }

    // Date filter
    if (dateFrom.value || dateTo.value) {
      const leakDate = new Date(leak.dateFound)
      
      if (dateFrom.value) {
        const fromDate = new Date(dateFrom.value)
        if (leakDate < fromDate) return false
      }
      
      if (dateTo.value) {
        const toDate = new Date(dateTo.value)
        toDate.setHours(23, 59, 59, 999) // Include the whole day
        if (leakDate > toDate) return false
      }
    }

    return true
  })
})

// Pagination computed
const paginatedLeaks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredLeaks.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredLeaks.value.length / itemsPerPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredLeaks.value.length)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Watchers to reset pagination when filters change
watch([selectedDataTypes, selectedRisks, selectedStatuses, selectedSources, selectedHashTypes], () => {
  currentPage.value = 1
}, { deep: true })

// Watcher to emit filtered data changes
watch(filteredLeaks, (newFilteredLeaks) => {
  emit('filteredDataChanged', newFilteredLeaks)
}, { immediate: true })

// Methods
const toggleDataTypeFilter = (type) => {
  const index = selectedDataTypes.value.indexOf(type)
  if (index > -1) {
    selectedDataTypes.value.splice(index, 1)
  } else {
    selectedDataTypes.value.push(type)
  }
}

const toggleRiskFilter = (risk) => {
  const index = selectedRisks.value.indexOf(risk)
  if (index > -1) {
    selectedRisks.value.splice(index, 1)
  } else {
    selectedRisks.value.push(risk)
  }
}

const toggleStatusFilter = (status) => {
  const index = selectedStatuses.value.indexOf(status)
  if (index > -1) {
    selectedStatuses.value.splice(index, 1)
  } else {
    selectedStatuses.value.push(status)
  }
}

const toggleSourceFilter = (source) => {
  const index = selectedSources.value.indexOf(source)
  if (index > -1) {
    selectedSources.value.splice(index, 1)
  } else {
    selectedSources.value.push(source)
  }
}

const toggleHashTypeFilter = (hashType) => {
  const index = selectedHashTypes.value.indexOf(hashType)
  if (index > -1) {
    selectedHashTypes.value.splice(index, 1)
  } else {
    selectedHashTypes.value.push(hashType)
  }
}

const clearAllFilters = () => {
  selectedDataTypes.value = []
  selectedRisks.value = []
  selectedStatuses.value = []
  selectedSources.value = []
  selectedHashTypes.value = []
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1 // Reset page when clearing filters
}

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const togglePasswordVisibility = (leakId) => {
  passwordVisible[leakId] = !passwordVisible[leakId]
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // Show copied state temporarily
    const tempId = Date.now()
    copiedPasswords[tempId] = true
    setTimeout(() => {
      delete copiedPasswords[tempId]
    }, 2000)
  } catch (err) {
    console.error('Error copying to clipboard:', err)
  }
}

const toggleActionMenu = (leakId) => {
  // Close other menus
  Object.keys(openActionMenus).forEach(id => {
    if (id !== leakId.toString()) {
      openActionMenus[id] = false
    }
  })
  
  openActionMenus[leakId] = !openActionMenus[leakId]
}

const selectLeak = (leak) => {
  emit('selectLeak', leak)
}

const handleMenuAction = (action, leak) => {
  openActionMenus[leak.id] = false
  emit('menuAction', { action, leak })
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// Badge class methods using theme.css colors
const getDataTypeBadgeClass = (type, isSelected = false) => {
  const classes = {
    email: isSelected ? 'bg-blue text-white border-blue' : 'bg-blue text-blue border border-blue',
    password: isSelected ? 'bg-purple text-white border-purple' : 'bg-purple text-purple border border-purple',
    phone: isSelected ? 'bg-green text-white border-green' : 'bg-green text-green border border-green',
    address: isSelected ? 'bg-orange text-white border-orange' : 'bg-orange text-orange border border-orange',
    name: isSelected ? 'bg-yellow text-cmint-dark border-yellow' : 'bg-yellow text-yellow border border-yellow'
  }
  return classes[type] || (isSelected ? 'bg-card text-theme border-muted' : 'bg-card text-muted border border-muted')
}

const getRiskBadgeClass = (risk, isSelected = false) => {
  const riskLower = risk?.toLowerCase()
  const classes = {
    critical: isSelected ? 'bg-red text-white border-red' : 'badge-critical',
    high: isSelected ? 'bg-orange text-white border-orange' : 'badge-high',
    medium: isSelected ? 'bg-cmint-primary text-cmint-dark border-cmint-primary' : 'badge-medium',
    low: isSelected ? 'bg-green text-white border-green' : 'badge-low'
  }
  return classes[riskLower] || (isSelected ? 'bg-card text-theme border-muted' : 'badge-low')
}

const getStatusBadgeClass = (status, isSelected = false) => {
  const statusLower = status?.toLowerCase()
  const classes = {
    new: isSelected ? 'bg-blue text-white border-blue' : 'badge-new',
    validated: isSelected ? 'bg-green text-white border-green' : 'badge-validated',
    reviewed: isSelected ? 'bg-card text-theme border-muted' : 'badge-reviewed'
  }
  return classes[statusLower] || (isSelected ? 'bg-card text-theme border-muted' : 'badge-new')
}

// Close menus when clicking outside
document.addEventListener('click', () => {
  Object.keys(openActionMenus).forEach(id => {
    openActionMenus[id] = false
  })
})
</script>
