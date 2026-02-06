import { useState } from "react";
import { X, MapPin, CreditCard, MessageSquare, Phone, Banknote, QrCode } from "lucide-react";
import { CartItem, CheckoutData } from "@/types/menu";
import {
  RESTAURANT_CONFIG,
  PAYMENT_METHODS,
} from "@/config/menuConfig";

interface CheckoutProps {
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onComplete: () => void;
}

export function Checkout({ items, subtotal, onClose, onComplete }: CheckoutProps) {
  const [data, setData] = useState<CheckoutData>({
    neighborhood: null,
    address: {
      street: "",
      number: "",
      complement: "",
      reference: "",
    },
    paymentMethod: "",
    notes: "",
    customerWhatsApp: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const total = subtotal; // Taxa de entrega removida

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!RESTAURANT_CONFIG.schedule.isOpen) {
      newErrors.push("O restaurante está fechado no momento.");
    }

    if (items.length === 0) {
      newErrors.push("Seu carrinho está vazio.");
    }

    if (!data.address.street.trim()) {
      newErrors.push("Informe seu endereço completo (Rua, Bairro).");
    }

    if (!data.address.number.trim()) {
      newErrors.push("Informe o número ou 'S/N'.");
    }

    if (!data.paymentMethod) {
      newErrors.push("Selecione a forma de pagamento.");
    }

    if (!data.customerWhatsApp.trim()) {
      newErrors.push("Informe seu WhatsApp.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const generateWhatsAppMessage = (): string => {
    const lines: string[] = [
      "🍽️ *NOVO PEDIDO - " + RESTAURANT_CONFIG.name.toUpperCase() + "*",
      "",
      "📋 *ITENS DO PEDIDO:*",
    ];

    items.forEach((item) => {
      lines.push(
        `• ${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}`
      );
    });

    lines.push("");
    lines.push("💰 *VALORES:*");
    lines.push(`Subtotal: ${formatPrice(subtotal)}`);
    lines.push(`*TOTAL: ${formatPrice(total)}*`);

    lines.push("");
    lines.push("📍 *ENDEREÇO DE ENTREGA:*");
    lines.push(`Endereço: ${data.address.street}, ${data.address.number}`);
    if (data.address.complement) {
      lines.push(`Complemento: ${data.address.complement}`);
    }
    if (data.address.reference) {
      lines.push(`Referência: ${data.address.reference}`);
    }

    lines.push("");
    lines.push("💳 *PAGAMENTO:*");
    const paymentName = PAYMENT_METHODS.find((p) => p.id === data.paymentMethod)?.name || data.paymentMethod;
    lines.push(paymentName);

    if (data.notes.trim()) {
      lines.push("");
      lines.push("📝 *OBSERVAÇÕES:*");
      lines.push(data.notes);
    }

    lines.push("");
    lines.push("📱 *WHATSAPP DO CLIENTE:*");
    lines.push(data.customerWhatsApp);

    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${RESTAURANT_CONFIG.whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
    onComplete();
  };

  const getPaymentIcon = (iconName: string) => {
    switch (iconName) {
      case "banknote":
        return <Banknote className="w-5 h-5" />;
      case "qr-code":
        return <QrCode className="w-5 h-5" />;
      case "credit-card":
        return <CreditCard className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border scrollbar-gold">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="font-display text-xl font-semibold">Finalizar Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="p-4 rounded-lg bg-destructive/20 border border-destructive/50 space-y-1">
              {errors.map((error, i) => (
                <p key={i} className="text-destructive text-sm">• {error}</p>
              ))}
            </div>
          )}

          {/* 1. Address Input */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Endereço de Entrega *
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Rua e Bairro *"
                  value={data.address.street}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nº *"
                  value={data.address.number}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, number: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Complemento (Apto, Bloco, etc.)"
              value={data.address.complement}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  address: { ...prev.address, complement: e.target.value },
                }))
              }
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />

            <input
              type="text"
              placeholder="Ponto de Referência"
              value={data.address.reference}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  address: { ...prev.address, reference: e.target.value },
                }))
              }
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {/* 2. Payment Method */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CreditCard className="w-4 h-4 text-primary" />
              Forma de Pagamento *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setData((prev) => ({ ...prev, paymentMethod: method.id }))}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-300
                    ${
                      data.paymentMethod === method.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary hover:border-primary/50"
                    }
                  `}
                >
                  {getPaymentIcon(method.icon)}
                  <span className="text-xs font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Notes */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4 text-primary" />
              Observações
            </label>
            <textarea
              placeholder="Ex: Sem cebola, trocar queijo por requeijão..."
              value={data.notes}
              onChange={(e) => setData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
            />
          </div>

          {/* 4. Customer WhatsApp */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Phone className="w-4 h-4 text-primary" />
              Seu WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={data.customerWhatsApp}
              onChange={(e) => setData((prev) => ({ ...prev, customerWhatsApp: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {/* Order Summary */}
          <div className="space-y-3 p-4 rounded-lg bg-secondary/50 border border-border">
            <h3 className="font-medium">Resumo do Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold btn-gold-hover flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Enviar Pedido via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
