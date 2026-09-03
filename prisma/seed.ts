import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database for Korea Car Parts AZ...");

  // 1. Seed Admin
  const adminPassword = await bcrypt.hash("AdminPass2026!", 10);
  await prisma.admin.upsert({
    where: { email: "admin@koreacars.az" },
    update: {},
    create: {
      email: "admin@koreacars.az",
      name: "Mobis Export Supervisor",
      password: adminPassword,
      role: "super_admin",
    },
  });
  console.log("✅ Admin user created: admin@koreacars.az");

  // 2. Seed Categories
  const categoriesData = [
    {
      slug: "engine",
      icon: "Gauge",
      translations: JSON.stringify({
        en: { name: "Engine & Drivetrain" },
        az: { name: "Mühərrik və Güc Sistemi" },
        ru: { name: "Двигатель и привод" },
        ko: { name: "엔진 및 구동계" },
      }),
    },
    {
      slug: "brakes",
      icon: "Disc",
      translations: JSON.stringify({
        en: { name: "Brake Systems & Discs" },
        az: { name: "Əyləc Sistemi və Disklər" },
        ru: { name: "Тормозная система и диски" },
        ko: { name: "브레이크 및 디스크" },
      }),
    },
    {
      slug: "suspension",
      icon: "Wrench",
      translations: JSON.stringify({
        en: { name: "Suspension & Steering" },
        az: { name: "Asqı və Sükan Sistemi" },
        ru: { name: "Подвеска и рулевое управление" },
        ko: { name: "서스펜션 및 조향계" },
      }),
    },
    {
      slug: "electrical",
      icon: "Zap",
      translations: JSON.stringify({
        en: { name: "Electronics & Lighting" },
        az: { name: "Elektronika və İşıqlar" },
        ru: { name: "Электроника и оптика" },
        ko: { name: "전장 및 램프" },
      }),
    },
    {
      slug: "body",
      icon: "Shield",
      translations: JSON.stringify({
        en: { name: "Body Parts & Panels" },
        az: { name: "Kuzov Hissələri və Panellər" },
        ru: { name: "Кузовные детали и панели" },
        ko: { name: "외장 바디 및 판넬" },
      }),
    },
    {
      slug: "filters",
      icon: "Filter",
      translations: JSON.stringify({
        en: { name: "Filters & Maintenance" },
        az: { name: "Filtrlər və Baxım" },
        ru: { name: "Фильтры и ТО" },
        ko: { name: "필터 및 소모품" },
      }),
    },
    {
      slug: "transmission",
      icon: "Cog",
      translations: JSON.stringify({
        en: { name: "Transmission & Gearbox" },
        az: { name: "Sürətlər Qutusu və Mufta" },
        ru: { name: "Трансмиссия и КПП" },
        ko: { name: "변속기 및 미션" },
      }),
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Categories seeded");

  // 3. Seed Hyundai / Kia / Genesis OEM Parts
  const partsData = [
    {
      partNumber: "58101-C1A00",
      brand: "Hyundai",
      category: "brakes",
      priceUSD: 48,
      priceAZN: 82,
      inStock: true,
      stockCount: 14,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: true,
      weightKg: 1.85,
      oemBrand: "Hyundai Mobis Genuine",
      compatibleModels: "Hyundai Sonata LF (2015-2019), Sonata DN8 (2020-2023), Kia Optima JF (2016-2020), Kia K5 (2020-2023)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Front OEM Ceramic Brake Pads Set",
          desc: "Original factory-spec Mobis front brake pads engineered for quiet performance, low dust, and maximum stopping friction on Hyundai Sonata & Kia Optima/K5.",
        },
        az: {
          name: "Qabaq Orijinal Keramika Əyləc Bəndləri (Nakladka)",
          desc: "Hyundai Sonata və Kia Optima/K5 üçün orijinal Hyundai Mobis qabaq əyləc nakladkaları. Səssiz əyləcləmə, tozsuz işləmə və yüksək istiliyə davamlılıq.",
        },
        ru: {
          name: "Комплект передних оригинальных тормозных колодок Mobis",
          desc: "Оригинальные передние керамические колодки Hyundai Mobis для Sonata и Optima/K5. Минимальный износ дисков, отсутствие скрипов и пыли.",
        },
        ko: {
          name: "프론트 순정 세라믹 브레이크 패드 세트 (모비스)",
          desc: "현대 쏘나타 LF/DN8 및 기아 K5 순정 전륜 브레이크 패드. 저분진, 무소음, 뛰어난 제동력을 보장하는 100% 모비스 정품.",
        },
      }),
    },
    {
      partNumber: "28113-F2000",
      brand: "Hyundai",
      category: "filters",
      priceUSD: 18,
      priceAZN: 31,
      inStock: true,
      stockCount: 28,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: true,
      weightKg: 0.35,
      oemBrand: "Hyundai Mobis Genuine",
      compatibleModels: "Hyundai Elantra AD (2016-2020), Elantra CN7 (2021-2024), Avante, Kia Cerato / Forte (2017-2023)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Genuine Engine Air Filter Element",
          desc: "High-filtration micro-fiber engine air filter capturing 99.4% of dust particles, optimizing air-fuel ratio and engine horsepower.",
        },
        az: {
          name: "Orijinal Mühərrik Hava Filtri",
          desc: "Hyundai Elantra və Kia Cerato üçün yüksək sıxlıqlı orijinal mühərrik hava filtri. Mühərriki tozdan qoruyur və yanacaq sərfiyyatını optimallaşdırır.",
        },
        ru: {
          name: "Оригинальный воздушный фильтр двигателя Mobis",
          desc: "Оригинальный фильтр очистки воздуха для Hyundai Elantra и Kia Cerato. Задерживает до 99.4% пыли, снижает расход топлива.",
        },
        ko: {
          name: "엔진 순정 에어크리너 필터 (아반떼 / K3)",
          desc: "현대 아반떼 AD/CN7 및 기아 K3용 모비스 순정 에어필터. 최적의 흡기 효율 및 엔진 보호 성능 제공.",
        },
      }),
    },
    {
      partNumber: "92102-N9100",
      brand: "Hyundai",
      category: "electrical",
      priceUSD: 430,
      priceAZN: 730,
      inStock: true,
      stockCount: 4,
      location: "Seoul Direct",
      deliveryDays: "4-6 days",
      featured: true,
      weightKg: 4.2,
      oemBrand: "Hyundai Mobis Korea",
      compatibleModels: "Hyundai Tucson NX4 (2021, 2022, 2023, 2024)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Full LED Front Headlight Assembly (Right / Passenger Side)",
          desc: "Factory authentic OEM full LED projector headlight for the 4th generation Hyundai Tucson NX4 with integrated parametric daytime running lights.",
        },
        az: {
          name: "Tam LED Qabaq Fara Korpusu (Sağ Tərəf)",
          desc: "Hyundai Tucson NX4 (2021-2024) üçün zavod istehsalı tam LED qabaq sağ fara. Parametrik gündüz işıqları və linzalı optika ilə təchiz olunub.",
        },
        ru: {
          name: "Передняя светодиодная фара Full LED (Правая)",
          desc: "Оригинальная правая LED блок-фара в сборе для Hyundai Tucson NX4 2021-2024. Заводской артикул Mobis, идеальная геометрия и светотеневая граница.",
        },
        ko: {
          name: "투싼 NX4 풀 LED 프로젝션 헤드램프 어셈블리 (우측)",
          desc: "현대 투싼 NX4(2021~2024) 모비스 순정 풀 LED 헤드램프 우측. 파라메트릭 쥬얼 DRL 내장 완제품.",
        },
      }),
    },
    {
      partNumber: "28231-2B760",
      brand: "Kia",
      category: "engine",
      priceUSD: 680,
      priceAZN: 1150,
      inStock: true,
      stockCount: 3,
      location: "Seoul Direct",
      deliveryDays: "4-7 days",
      featured: true,
      weightKg: 7.8,
      oemBrand: "Hyundai Mobis / Garrett Korea",
      compatibleModels: "Kia K5 DL3 1.6T (2020-2024), Hyundai Sonata DN8 1.6 T-GDI, Kia Sportage NQ5, Hyundai Tucson NX4",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "OEM Turbocharger Unit Assembly 1.6 T-GDI Smartstream",
          desc: "Brand new original factory turbocharger with electronic wastegate actuator for Hyundai and Kia 1.6 Turbo direct-injection engines.",
        },
        az: {
          name: "Orijinal 1.6 T-GDI Smartstream Turbokompressor Komplekti",
          desc: "Kia K5, Sportage və Hyundai Sonata 1.6 Turbo mühərrikləri üçün elektron klapanlı orijinal zavod turbosu. Maksimum güc və etibarlılıq.",
        },
        ru: {
          name: "Оригинальный турбокомпрессор в сборе 1.6 T-GDI Smartstream",
          desc: "Новый оригинальный турбонагнетатель с электронным актуатором для Kia K5, Sportage, Hyundai Sonata и Tucson 1.6T.",
        },
        ko: {
          name: "1.6 T-GDI 스마트스트림 순정 터보차저 어셈블리",
          desc: "현대 쏘나타 DN8 / 기아 K5 DL3 / 스포티지 NQ5 1.6 터보 전용 모비스 정품 터보차저 완품.",
        },
      }),
    },
    {
      partNumber: "54651-S1000",
      brand: "Hyundai",
      category: "suspension",
      priceUSD: 115,
      priceAZN: 195,
      inStock: true,
      stockCount: 8,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: true,
      weightKg: 4.8,
      oemBrand: "Mando / Hyundai Mobis",
      compatibleModels: "Hyundai Santa Fe TM (2018-2023), Kia Sorento MQ4 (2020-2024)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Front Left Strut Shock Absorber Assembly",
          desc: "Gas-pressurized genuine front shock absorber by Mando Korea for Hyundai Santa Fe and Kia Sorento, providing factory ride comfort and stability.",
        },
        az: {
          name: "Qabaq Sol Amortizator Dayaması (Stoyka)",
          desc: "Hyundai Santa Fe TM və Kia Sorento MQ4 üçün Mando/Mobis qazlı orijinal qabaq sol amortizator. Yüksək idarəetmə və rahatlıq təmin edir.",
        },
        ru: {
          name: "Передний левый амортизатор в сборе (Mando / Mobis)",
          desc: "Оригинальная передняя левая амортизационная стойка для Hyundai Santa Fe TM и Kia Sorento MQ4. Газомасляная конструкция, плавный ход.",
        },
        ko: {
          name: "프론트 좌측 순정 쇼크업소버 어셈블리 (산타페 TM / 쏘렌토 MQ4)",
          desc: "현대 싼타페 TM 및 기아 쏘렌토 MQ4 전륜 좌측 순정 만도/모비스 쇼바. 순정 승차감 완벽 복원.",
        },
      }),
    },
    {
      partNumber: "86350-L3000",
      brand: "Kia",
      category: "body",
      priceUSD: 165,
      priceAZN: 280,
      inStock: true,
      stockCount: 6,
      location: "Seoul Direct",
      deliveryDays: "4-7 days",
      featured: false,
      weightKg: 2.9,
      oemBrand: "Kia Genuine Parts",
      compatibleModels: "Kia K5 DL3 (2020, 2021, 2022, 2023, 2024)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Front Radiator Grille (Gloss Black Sport Trim)",
          desc: "Original factory front tiger-nose radiator grille with camera aperture for Kia K5 DL3 generation.",
        },
        az: {
          name: "Qabaq Radiator Barmaqlığı (Qara Parlaq Sport)",
          desc: "Kia K5 DL3 üçün zavod istehsalı ön radiator barmaqlığı (oblisovka). Ön kamera yeri ilə tam uyğundur.",
        },
        ru: {
          name: "Решетка радиатора передняя (Черный глянец)",
          desc: "Оригинальная заводская решетка радиатора для Kia K5 DL3 2020-2024. Идеальная стыковка с бампером, отверстие под камеру 360.",
        },
        ko: {
          name: "라디에이터 그릴 어셈블리 (K5 DL3 스포츠)",
          desc: "기아 K5 DL3 순정 타이거노즈 라디에이터 그릴. 전방 카메라 홀 포함 유광 블랙 정품.",
        },
      }),
    },
    {
      partNumber: "18846-11070",
      brand: "Hyundai",
      category: "filters",
      priceUSD: 36,
      priceAZN: 60,
      inStock: true,
      stockCount: 35,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: true,
      weightKg: 0.25,
      oemBrand: "Hyundai Mobis / NGK Korea",
      compatibleModels: "Hyundai Sonata, Elantra, Tucson, Kia K5, Sportage, Cerato, Seltos (2.0L / 1.6T)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "OEM Iridium Spark Plugs Set (Pack of 4)",
          desc: "High performance laser iridium spark plugs with platinum ground electrode engineered for Korean direct-injection engines (GDI & T-GDI).",
        },
        az: {
          name: "Orijinal İridium Alışdırma Şamları Dəsti (4 ədəd)",
          desc: "Hyundai və Kia GDI / T-GDI mühərrikləri üçün Mobis lazer iridium sveça dəsti. Stabil qığılcım, tezləşmə və 100,000 km xidmət ömrü.",
        },
        ru: {
          name: "Комплект оригинальных иридиевых свечей зажигания (4 шт)",
          desc: "Оригинальные свечи зажигания Mobis Laser Iridium для двигателей GDI и Turbo Hyundai/Kia. Ресурс до 100 000 км пробега.",
        },
        ko: {
          name: "순정 레이저 이리듐 스파크 플러그 세트 (4개입)",
          desc: "현대 및 기아 GDI/터보 엔진용 모비스 순정 레이저 이리듐 점화플러그 4개 세트. 10만km 긴 내구성.",
        },
      }),
    },
    {
      partNumber: "51712-J5000",
      brand: "Genesis",
      category: "brakes",
      priceUSD: 240,
      priceAZN: 410,
      inStock: true,
      stockCount: 5,
      location: "Seoul Direct",
      deliveryDays: "4-6 days",
      featured: true,
      weightKg: 19.5,
      oemBrand: "Genesis Mobis / Brembo",
      compatibleModels: "Genesis G70 (2018-2024), Genesis G80 (2020-2024), Kia Stinger GT 3.3T (2018-2023)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "Front Ventilated Sport Brake Rotors Pair (350mm)",
          desc: "High-carbon ventilated directional front brake discs for Genesis luxury and Stinger performance sedans.",
        },
        az: {
          name: "Qabaq Ventilyasiyalı İdman Əyləc Diskləri Cütü (350mm)",
          desc: "Genesis G70, G80 və Kia Stinger GT üçün yüksək karbonlu orijinal qabaq əyləc apornu diskləri. Qızmaya davamlı və vibrasiyasız.",
        },
        ru: {
          name: "Пара передних вентилируемых тормозных дисков (350мм)",
          desc: "Оригинальные высокоуглеродистые тормозные диски для Genesis G70/G80 и Kia Stinger GT 3.3T. Заводское качество Mobis.",
        },
        ko: {
          name: "제네시스 G70/G80 & 스팅어 순정 대용량 벤틸레이티드 전륜 디스크 (페어)",
          desc: "제네시스 G70, G80 및 기아 스팅어 3.3T용 모비스 순정 전륜 350mm 브레이크 로터 디스크 2개(좌우 세트).",
        },
      }),
    },
    {
      partNumber: "46321-4H000",
      brand: "Hyundai",
      category: "transmission",
      priceUSD: 55,
      priceAZN: 94,
      inStock: true,
      stockCount: 16,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: false,
      weightKg: 0.8,
      oemBrand: "Hyundai Transys / Mobis",
      compatibleModels: "Hyundai Santa Fe, Palisade, Grandeur, Kia Sorento, Carnival, K7, K8 (8-Speed Automatic)",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "8-Speed Automatic Transmission Oil Filter & Pan Gasket",
          desc: "OEM internal transmission hydraulic fluid filter for Hyundai & Kia 8-speed electronic automatic gearboxes.",
        },
        az: {
          name: "8 Pilləli Avtomat Sürətlər Qutusu Yağ Filtri və Araqat",
          desc: "Hyundai Santa Fe, Palisade və Kia Sorento, Carnival 8 pilləli avtomat karobkaları üçün orijinal yağ filtri.",
        },
        ru: {
          name: "Масляный фильтр 8-ступенчатой АКПП с прокладкой поддона",
          desc: "Оригинальный фильтр гидравлической жидкости 8-АКПП Hyundai Transys для Santa Fe, Palisade, Sorento, Carnival.",
        },
        ko: {
          name: "8단 자동변속기 오일필터 및 가스켓 키트 (트랜시스 순정)",
          desc: "현대 싼타페, 팰리세이드, 그랜저 및 기아 쏘렌토, 카니발 8단 오토미션 순정 필터.",
        },
      }),
    },
    {
      partNumber: "56310-3X500",
      brand: "Kia",
      category: "suspension",
      priceUSD: 95,
      priceAZN: 160,
      inStock: true,
      stockCount: 11,
      location: "Baku Warehouse",
      deliveryDays: "24 hours",
      featured: false,
      weightKg: 1.1,
      oemBrand: "Hyundai Mobis Genuine",
      compatibleModels: "Hyundai Elantra MD/AD, Sonata YF/LF, Kia Forte, Optima K5, Soul",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
      ]),
      translations: JSON.stringify({
        en: {
          name: "MDPS Steering Column Flexible Coupling & Motor Assembly",
          desc: "OEM replacement electric power steering flexible rubber coupler and motor damper solving clicking and looseness in steering wheels.",
        },
        az: {
          name: "MDPS Elektrik Sükan Motoru Elastik Muftası (Zvanok)",
          desc: "Hyundai Elantra, Sonata və Kia Optima üçün sükan çıqqıltısını və boşluğunu aradan qaldıran gücləndirilmiş orijinal rezin mufta dəsti.",
        },
        ru: {
          name: "Эластичная муфта рулевой колонки MDPS (Усиленная)",
          desc: "Оригинальная демпферная шестерня электроусилителя руля Hyundai/Kia для устранения стуков в рулевом валу.",
        },
        ko: {
          name: "MDPS 전동식 파워스티어링 플렉시블 커플링 (모비스 정품)",
          desc: "현대 아반떼, 쏘나타 및 기아 K5, K3 스티어링 휠 유격 및 잡음 해결용 모비스 순정 커플링.",
        },
      }),
    },
  ];

  for (const part of partsData) {
    await prisma.part.upsert({
      where: { partNumber: part.partNumber },
      update: part,
      create: part,
    });
  }
  console.log(`✅ ${partsData.length} OEM parts seeded successfully`);

  // 4. Seed Initial Customer Inquiry Requests (Sample CRM Data)
  const inquiriesData = [
    {
      vinCode: "KMHD84LF5JU189204",
      partNumber: "92101-C1000",
      partName: "Front LED Headlight (Left Side)",
      carModel: "Hyundai Sonata LF 2.0L",
      carYear: 2018,
      quantity: 1,
      details: "Need original Mobis full LED version without adaptive curve light. Baku delivery.",
      name: "Tural Aliyev",
      phone: "+994 50 412 88 99",
      email: "tural.aliyev@mail.ru",
      urgency: "standard",
      status: "new",
      adminNotes: "Customer sent photo via WhatsApp. Checking Incheon stock.",
    },
    {
      vinCode: "KNAGU41CBD5729103",
      partNumber: "28231-2B760",
      partName: "OEM Turbocharger Unit",
      carModel: "Kia K5 GT-Line 1.6T",
      carYear: 2021,
      quantity: 1,
      details: "Need direct air shipping from Korea within 5 days.",
      name: "Rashad Hasanov",
      phone: "+994 55 980 12 34",
      email: "rashad.h@gmail.com",
      urgency: "express_air",
      status: "quoted",
      quotePriceUSD: 680,
      adminNotes: "Quote given $680 + $45 express air freight. Customer reviewing.",
    },
    {
      vinCode: "KMHL34JB9LA098124",
      partNumber: null,
      partName: "Complete Rear Suspension Control Arms & Bushings Set",
      carModel: "Hyundai Santa Fe TM 2.4 AWD",
      carYear: 2019,
      quantity: 2,
      details: "Both left and right rear upper/lower control arms with genuine Mobis rubber bushings.",
      name: "Elnur Gasimov (Auto Garage Baku)",
      phone: "+994 70 333 44 55",
      email: "elnur.auto@service.az",
      urgency: "standard",
      status: "ordered",
      quotePriceUSD: 310,
      adminNotes: "Payment confirmed. Order sent to Seoul warehouse for packing.",
    },
  ];

  for (const inq of inquiriesData) {
    await prisma.inquiryRequest.create({
      data: inq,
    });
  }
  console.log("✅ Sample customer inquiry requests seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
