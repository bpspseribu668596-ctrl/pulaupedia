"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react";

interface FooterConfig {
  id?: number;
  companyName: string;
  companyAddress: string;
  phone: string;
  email: string;
  logo: string;
}

const defaultFooter: FooterConfig = {
  companyName: 'BPS Kepulauan Seribu',
  companyAddress: 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta',
  phone: '+62-21-XXXXXX',
  email: 'info@kepulauanseribu.bps.go.id',
  logo: 'uploads/footer/logo.png',
};

export default function Footer() {
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(defaultFooter);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const response = await fetch('/api/footer');
        if (response.ok) {
          const data = await response.json();
          setFooterConfig(data);
        }
      } catch (error) {
        console.error('Error fetching footer config:', error);
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
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={`/api/${footerConfig.logo}`}
              alt="Logo BPS"
              width={80}
              height={80}
              className="object-contain opacity-90"
              style={{ width: "auto", height: "80px" }}
            />
            <span className="text-white font-bold text-xl md:text-2xl uppercase">
              {footerConfig.companyName}
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
              {footerConfig.companyAddress}
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
              {footerConfig.phone}
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <Globe className="w-5 h-5" style={{ color: gradientColor1 }} />
              <h3 className="font-bold" style={{ color: gradientColor1 }}>
                Email
              </h3>
            </div>
            <a
              href={`mailto:${footerConfig.email}`}
              className="text-sm text-gray-300 transition-colors"
              style={{ 
                color: "inherit"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = gradientColor1}
              onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
            >
              {footerConfig.email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2026 {footerConfig.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
