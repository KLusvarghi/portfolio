"use client";

import { useLocaleData } from "@/contexts/locale-data-context";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook customizado para gerenciar a troca de idioma da aplicação.
 *
 * @returns {Object} Objeto contendo:
 *   - locale: string - O idioma atual ('pt' ou 'en')
 *   - changeLanguage: (newLocale: string) => void - Função para trocar o idioma
 *   - mounted: boolean - Indica se o componente foi montado no cliente
 *
 * @example
 * const { locale, changeLanguage, mounted } = useLanguageSwitcher();
 *
 * // Trocar para inglês
 * changeLanguage('en');
 *
 * // Trocar para português
 * changeLanguage('pt');
 */
export function useLanguageSwitcher() {
  const { locale, reloadData } = useLocaleData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Troca o idioma da aplicação.
   * Atualiza o localStorage, recarrega os dados do contexto e recarrega a página.
   *
   * @param {string} newLocale - O novo idioma a ser definido ('pt' ou 'en')
   */
  const changeLanguage = useCallback(
    async (newLocale: string) => {
      // Só executa se o componente estiver montado
      if (!mounted) {
        return;
      }

      // Previne troca desnecessária se o locale já for o mesmo
      if (newLocale === locale) {
        return;
      }

      try {
        // Atualiza o localStorage com o novo locale
        localStorage.setItem("locale", newLocale);

        // Recarrega os dados com o novo locale
        await reloadData(newLocale);

        // Recarrega a página para aplicar o novo locale completamente
        window.location.reload();
      } catch (error) {
        console.error("Erro ao trocar idioma:", error);
      }
    },
    [locale, reloadData, mounted]
  );

  return {
    locale,
    changeLanguage,
    mounted,
  };
}
