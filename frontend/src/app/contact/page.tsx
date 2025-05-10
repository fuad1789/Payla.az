import { Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Əlaqə 📬</h1>
              <p className="text-muted-foreground">
                Bizə öz əşyalarınızı kirayəyə vermək istəyirsiniz və ya hər
                hansı sualınız var? Bizimlə əlaqə saxlayın və qısa müddətdə sizə
                cavab verəcəyik.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p className="text-muted-foreground">+994 55 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">info@paylas.az</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Ünvan</h3>
                  <p className="text-muted-foreground">Bakı, Azərbaycan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Ad, Soyad
                </label>
                <Input
                  id="name"
                  placeholder="Adınızı və soyadınızı daxil edin"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email ünvanınızı daxil edin"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Telefon
                </label>
                <Input id="phone" placeholder="Telefon nömrənizi daxil edin" />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Mesaj
                </label>
                <Textarea
                  id="message"
                  placeholder="Mesajınızı daxil edin"
                  className="min-h-[150px]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Göndər
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Məlumatlarınız gizli saxlanılır və üçüncü tərəflərlə paylaşılmır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
