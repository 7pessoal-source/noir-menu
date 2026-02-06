/* =============================================================================
   CARDÁPIO DIGITAL - CONFIGURAÇÃO CENTRALIZADA
   
   Este arquivo contém TODAS as configurações editáveis do cardápio.
   Modifique os valores abaixo para personalizar o cardápio.
   ============================================================================= */

import { RestaurantConfig, DeliveryConfig, Neighborhood, Product, PaymentMethod } from "@/types/menu";

// ============================================================================
// IMAGENS DOS PRODUTOS
// ============================================================================
import imgCamarao from "@/assets/products/camarao.jpg";
import imgCostela from "@/assets/products/carne-moida.jpg";
import imgBacalhau from "@/assets/products/bacalhau.jpg";
import imgCarneMoida from "@/assets/products/carne-moida.jpg";
import imgFrango from "@/assets/products/frango.jpg";
import imgCalabresa from "@/assets/products/calabresa.jpg";

/* -----------------------------------------------------------------------------
   1. CONFIGURAÇÕES GERAIS DO RESTAURANTE
   ----------------------------------------------------------------------------- */
export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Pastel do Show",
  tagline: "O sabor que você esperava, agora pertinho de você!",
  whatsappNumber: "5521982951731",
  address: "Avenida Vereador Albertino Guedes, 350 - Em frente ao Condomínio San Marino",
  schedule: {
    isOpen: true,
    openTime: "17:00",
    closeTime: "23:00",
    workingDays: "Segunda a Sábado",
    closedMessage: "Estamos fechados no momento. Nosso horário de funcionamento é de Segunda a Sábado, das 17h às 23h.",
  },
};

/* -----------------------------------------------------------------------------
   2. CONFIGURAÇÕES DE ENTREGA
   ----------------------------------------------------------------------------- */
export const DELIVERY_CONFIG: DeliveryConfig = {
  minimumOrder: 0.00,
  minimumOrderEnabled: false,
  estimatedTime: "30-50 min",
};

/* -----------------------------------------------------------------------------
   3. BAIRROS ATENDIDOS (Removidos conforme solicitação)
   ----------------------------------------------------------------------------- */
export const NEIGHBORHOODS: Neighborhood[] = [];

/* -----------------------------------------------------------------------------
   4. FORMAS DE PAGAMENTO
   ----------------------------------------------------------------------------- */
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "pix", name: "Pix", icon: "qr-code" },
  { id: "cartao", name: "Cartão", icon: "credit-card" },
  { id: "dinheiro", name: "Dinheiro", icon: "banknote" },
];

/* -----------------------------------------------------------------------------
   5. CATEGORIAS DOS PRODUTOS
   ----------------------------------------------------------------------------- */
export const CATEGORIES = [
  { id: "all", name: "Todos" },
  { id: "premium", name: "Sabores Premium" },
  { id: "tradicionais", name: "Sabores Tradicionais" },
] as const;

/* -----------------------------------------------------------------------------
   6. CATÁLOGO DE PRODUTOS
   ----------------------------------------------------------------------------- */
export const PRODUCTS: Product[] = [
  // ======================== SABORES PREMIUM ========================
  {
    id: "premium-01",
    name: "Camarão",
    description: "Pastel recheado com camarões selecionados e tempero especial. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 12.00,
    category: "premium",
    image: imgCamarao,
  },
  {
    id: "premium-02",
    name: "Costela",
    description: "Pastel de costela desfiada super suculenta. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 12.00,
    category: "premium",
    image: imgCostela, 
  },
  {
    id: "premium-03",
    name: "Bacalhau",
    description: "O clássico pastel de bacalhau com tempero da casa. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 12.00,
    category: "premium",
    image: imgBacalhau,
  },
  
  // ======================== SABORES TRADICIONAIS ========================
  {
    id: "tradicional-01",
    name: "Carne Moída",
    description: "Carne moída bem temperadinha e suculenta. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 10.00,
    category: "tradicionais",
    image: imgCarneMoida,
  },
  {
    id: "tradicional-02",
    name: "Frango",
    description: "Frango desfiado com temperos naturais. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 10.00,
    category: "tradicionais",
    image: imgFrango,
  },
  {
    id: "tradicional-03",
    name: "Calabresa",
    description: "Calabresa de primeira qualidade moída. Acompanhamentos inclusos: Queijo, Azeitona, Requeijão e Milho.",
    price: 10.00,
    category: "tradicionais",
    image: imgCalabresa,
  },
];
