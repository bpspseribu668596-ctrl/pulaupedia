"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react";
import { ERROR_MESSAGES } from "@/lib/error-messages";

interface FooterConfig {
  id?: number;
  companyName: string;
  companyAddress: string;
  phone: string;
  email: string;
  logo: string;
}

export default function Footer() {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);
  const [footerError, setFooterError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const response = await fetch('/api/footer');
        if (response.ok) {
          const data = await response.json();
          setFooterConfig(data);
        } else {
          setFooterError(ERROR_MESSAGES.FOOTER_UNAVAILABLE);
        }
      } catch (error) {
        console.error('Error fetching footer config:', error);
        setFooterError(ERROR_MESSAGES.DB_CONNECTION);
      }
    };

    fetchFooterConfig();
  }, []);

  const gradientColor1 = "#A87932";
  const gradientColor2 = "#D83F3F";

  return (
    <footer className="bg-[#111111] py-12 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`
        }}
      ></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A87932] rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {footerError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
            {footerError}
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-4">
                {footerConfig?.logo ? (
                  <Image
                    src={`/api/${footerConfig.logo}`}
                    alt="Logo BPS"
                    width={80}
                    height={80}
                    className="object-contain opacity-90"
                    style={{ width: "auto", height: "80px" }}
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded bg-white/10">
                    <span className="text-white/50 text-xs text-center leading-tight">Logo<br/>tidak tersedia</span>
                  </div>
                )}
                <span className="text-white font-bold text-xl md:text-2xl uppercase">
                  {footerConfig?.companyName ?? 'BPS Kepulauan Seribu'}
                </span>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-white max-w-5xl mx-auto mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <MapPin className="w-5 h-5" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold" style={{ color: gradientColor1 }}>
                    Alamat Kantor
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {footerConfig?.companyAddress ?? 'Alamat tidak tersedia'}
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <Phone className="w-5 h-5" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold" style={{ color: gradientColor1 }}>
                    Kontak
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {footerConfig?.phone ?? 'Nomor tidak tersedia'}
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <Globe className="w-5 h-5" style={{ color: gradientColor1 }} />
                  <h3 className="font-bold" style={{ color: gradientColor1 }}>
                    Email
                  </h3>
                </div>
                {footerConfig?.email ? (
                  <a
                    href={`mailto:${footerConfig.email}`}
                    className="text-sm text-gray-300 transition-colors"
                    style={{ color: "inherit" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = gradientColor1}
                    onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
                  >
                    {footerConfig.email}
                  </a>
                ) : (
                  <p className="text-sm text-gray-300">Email tidak tersedia</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <p className="text-center text-gray-400 text-sm">
                © 2026 {footerConfig?.companyName ?? 'BPS Kepulauan Seribu'}. All rights reserved.
              </p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
