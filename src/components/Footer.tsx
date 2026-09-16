"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react";
import { ERROR_MESSAGES } from "@/lib/error-messages";

interface FooterConfig {
  id?: number;
  companyName: string;
  companyAddress: string[];
  contacts: { label: string; value: string }[];
  links: { label: string; url: string }[];
  logo: string;
}

function resolveImageUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return null;
}

export default function Footer() {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);
  const [footerError, setFooterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const response = await fetch('/api/footer');
        if (response.ok) {
          setFooterConfig(await response.json());
        } else {
          setFooterError(ERROR_MESSAGES.FOOTER_UNAVAILABLE);
        }
      } catch {
        setFooterError(ERROR_MESSAGES.DB_CONNECTION);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFooterConfig();
  }, []);

  const gradientColor1 = "#A87932";
  const gradientColor2 = "#D83F3F";

  return (
    <footer className="bg-[#111111] py-10 sm:py-12 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundImage: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})` }}
      />
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#A87932] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {footerError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center text-sm sm:text-base">
            {footerError}
          </div>
        ) : isLoading ? (
          <div className="animate-pulse">
            {/* Logo + nama skeleton */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 sm:w-20 h-14 sm:h-20 bg-white/10 rounded shrink-0" />
                <div className="h-5 sm:h-6 w-36 sm:w-48 bg-white/10 rounded" />
              </div>
            </div>
            {/* 3 kolom skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-6 sm:mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-32 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/10 rounded" />
                  <div className="h-3 w-4/5 bg-white/10 rounded" />
                  <div className="h-3 w-3/5 bg-white/10 rounded" />
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-5 sm:pt-6 flex justify-center">
              <div className="h-3 w-48 sm:w-64 bg-white/10 rounded" />
            </div>
          </div>
        ) : (
          <>
            {/* Logo + nama perusahaan — desktop only, mobile punya sendiri di bawah */}
            <div className="hidden md:flex justify-center mb-6 sm:mb-8">
              <Link href="/" className="flex items-center gap-4">
                {resolveImageUrl(footerConfig?.logo) ? (
                  <img
                    src={resolveImageUrl(footerConfig!.logo)!}
                    alt="Logo BPS"
                    className="object-contain opacity-90 shrink-0"
                    style={{ height: "60px", width: "auto" }}
                  />
                ) : (
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded bg-white/10">
                    <span className="text-white/50 text-xs text-center leading-tight">Logo<br />tidak tersedia</span>
                  </div>
                )}
                <span className="text-white font-bold text-xl md:text-2xl uppercase">
                  {footerConfig?.companyName ?? 'BPS Kepulauan Seribu'}
                </span>
              </Link>
            </div>

            {/* Mobile layout: vertikal stack dengan divider */}
            <div className="md:hidden flex flex-col divide-y divide-white/10 mb-6">
              {/* Logo + nama */}
              <div className="pb-5 flex items-center gap-3">
                {resolveImageUrl(footerConfig?.logo) ? (
                  <img
                    src={resolveImageUrl(footerConfig!.logo)!}
                    alt="Logo BPS"
                    className="object-contain opacity-90 shrink-0"
                    style={{ height: "48px", width: "auto" }}
                  />
                ) : (
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded bg-white/10">
                    <span className="text-white/50 text-[10px] text-center leading-tight">Logo</span>
                  </div>
                )}
                <span className="text-white font-bold text-sm uppercase leading-tight">
                  {footerConfig?.companyName ?? 'BPS Kepulauan Seribu'}
                </span>
              </div>

              {/* Alamat */}
              {footerConfig?.companyAddress?.length ? (
                <div className="py-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: gradientColor1 }} />
                    <h3 className="font-bold text-xs uppercase tracking-widest" style={{ color: gradientColor1 }}>Alamat Kantor</h3>
                  </div>
                  <div className="space-y-1.5">
                    {footerConfig.companyAddress.map((addr, i) => (
                      <p key={i} className="text-xs text-gray-300 leading-relaxed">{addr}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Kontak */}
              {footerConfig?.contacts?.length ? (
                <div className="py-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: gradientColor1 }} />
                    <h3 className="font-bold text-xs uppercase tracking-widest" style={{ color: gradientColor1 }}>Kontak</h3>
                  </div>
                  <div className="space-y-2">
                    {footerConfig.contacts.map((contact, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-400">{contact.label}</p>
                        <p className="text-xs text-gray-300 leading-relaxed break-all">{contact.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Tautan — logikanya sama seperti desktop */}
              {footerConfig?.links?.length ? (
                <div className="py-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 shrink-0" style={{ color: gradientColor1 }} />
                    <h3 className="font-bold text-xs uppercase tracking-widest" style={{ color: gradientColor1 }}>Tautan Lainnya</h3>
                  </div>
                  <div className="space-y-2">
                    {footerConfig.links.map((link, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-400">{link.label}</p>
                        <a
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-xs text-gray-300 hover:text-[#A87932] hover:underline break-all transition-colors"
                        >
                          {link.url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Desktop: 3 kolom grid (hidden di mobile) */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 text-white max-w-5xl mx-auto mb-6 sm:mb-8">
              {/* Alamat */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 shrink-0" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold text-base" style={{ color: gradientColor1 }}>Alamat Kantor</h3>
                </div>
                {footerConfig?.companyAddress?.length ? (
                  <div className="space-y-2">
                    {footerConfig.companyAddress.map((addr, i) => (
                      <p key={i} className="text-sm text-gray-300 leading-relaxed">{addr}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">Alamat tidak tersedia</p>
                )}
              </div>

              {/* Kontak */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-5 h-5 shrink-0" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold text-base" style={{ color: gradientColor1 }}>Kontak</h3>
                </div>
                {footerConfig?.contacts?.length ? (
                  <div className="space-y-2">
                    {footerConfig.contacts.map((contact, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-400">{contact.label}</p>
                        <p className="text-sm text-gray-300 leading-relaxed break-all">{contact.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">Kontak tidak tersedia</p>
                )}
              </div>

              {/* Tautan */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 shrink-0" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold text-base" style={{ color: gradientColor1 }}>Tautan Lainnya</h3>
                </div>
                {footerConfig?.links?.length ? (
                  <div className="space-y-2">
                    {footerConfig.links.map((link, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-400">{link.label}</p>
                        <a
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gray-300 hover:text-[#A87932] hover:underline break-all transition-colors"
                        >
                          {link.url}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">Tautan tidak tersedia</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-5 sm:pt-6">
              <p className="text-center text-gray-400 text-xs sm:text-sm">
                © 2026 {footerConfig?.companyName ?? 'BPS Kepulauan Seribu'}. All rights reserved.
              </p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}