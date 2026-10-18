"use client";

import { useEffect, useState } from "react";

export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/public/auth/session")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setIsAdmin(d.authenticated === true);
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false);
      })
      .finally(() => {
        if (!cancelled) setIsChecking(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { isAdmin, isChecking };
}
