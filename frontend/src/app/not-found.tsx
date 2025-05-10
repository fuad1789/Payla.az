import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center py-16">
        <div className="text-6xl font-bold text-primary">404</div>
        <h1 className="text-2xl font-bold tracking-tight">Səhifə tapılmadı</h1>
        <p className="text-muted-foreground max-w-[500px]">
          Üzr istəyirik, axtardığınız səhifə mövcud deyil və ya silinib.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ana səhifəyə qayıt
          </Button>
        </Link>
      </div>
    </div>
  );
}
