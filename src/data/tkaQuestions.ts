export interface TkaQuestion {
  id: number;
  code: string; // e.g. TKA-KIM-01
  topic: string; // Materi Pokok
  subtopic: string;
  competency: string; // Capaian Pembelajaran Kemendikdasmen
  stimulusTitle?: string;
  stimulusText?: string;
  stimulusData?: {
    type: 'table' | 'element_chart' | 'comparison';
    headers?: string[];
    rows?: (string | number)[][];
    note?: string;
  };
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: {
    concept: string;
    steps: string[];
    conclusion: string;
  };
  difficulty: 'Mudah' | 'Sedang' | 'HOTS / Sulit';
}

export const TKA_KIMIA_QUESTIONS: TkaQuestion[] = [
  {
    id: 1,
    code: "TKA-KIM-01",
    topic: "Struktur Atom & Sistem Periodik Unsur",
    subtopic: "Penentuan Golongan dari Energi Ionisasi Bertingkat",
    competency: "Menganalisis hubungan data energi ionisasi berturut-turut untuk menentukan elektron valensi dan letak unsur pada tabel periodik.",
    stimulusTitle: "Tabel Data Energi Ionisasi Bertingkat (IE)",
    stimulusText: "Seorang peneliti melakukan penembakan berkas elektron pada sampel gas atom unsur X dalam keadaan netral dan mengukur energi ionisasi bertingkat (IE₁ sampai IE₅) dalam satuan kJ/mol sebagai berikut:",
    stimulusData: {
      type: "table",
      headers: ["Energi Ionisasi", "IE₁", "IE₂", "IE₃", "IE₄", "IE₅"],
      rows: [
        ["Nilai (kJ/mol)", 496, 4562, 6910, 9543, 13353]
      ],
      note: "Catatan: Pengukuran dilakukan pada tekanan 1 atm dan suhu 298 K."
    },
    question: "Berdasarkan lonjakan energi ionisasi yang sangat drastis, unsur X paling mungkin membentuk senyawa ionik stabil dengan rumus kimia...",
    options: [
      { key: "A", text: "XCl₂ jika direaksikan dengan gas klorin" },
      { key: "B", text: "X₂O jika direaksikan dengan gas oksigen" },
      { key: "C", text: "XO jika direaksikan dengan gas oksigen" },
      { key: "D", text: "XCl₃ jika direaksikan dengan gas klorin" },
      { key: "E", text: "X₃N jika direaksikan dengan gas nitrogen" }
    ],
    correctKey: "B",
    explanation: {
      concept: "Lonjakan drastis energi ionisasi menunjukkan pelepasan elektron dari kulit dalam yang lebih dekat ke inti dan lebih stabil.",
      steps: [
        "Perhatikan rasio kenaikan IE: IE₁ = 496 kJ/mol ke IE₂ = 4562 kJ/mol (mengalami lonjakan hampir 10 KALI LIPAT!).",
        "Kenaikan drastis terjadi setelah pelepasan 1 elektron pertama. Hal ini membuktikan bahwa unsur X memiliki 1 ELEKTRON VALENSI (Golongan IA / Logam Alkali seperti Natrium).",
        "Sebagai unsur Golongan IA, atom X melepaskan 1 elektron membentuk kation X⁺.",
        "Oksigen (O) berada di Golongan VIA dengan biloks umum -2 membentuk anion O²⁻.",
        "Penggabungan kation X⁺ dan anion O²⁻ menghasilkan rumus kimia netral X₂O."
      ],
      conclusion: "Jawaban yang benar adalah B (X₂O), karena kation X⁺ berikatan secara ionik dengan anion O²⁻ membentuk X₂O."
    },
    difficulty: "HOTS / Sulit"
  },
  {
    id: 2,
    code: "TKA-KIM-02",
    topic: "Sifat Keperiodikan Unsur",
    subtopic: "Jari-Jari Atom & Jari-Jari Ion",
    competency: "Membandingkan ukuran jari-jari spesi isoelektronik berdasarkan jumlah proton dan muatan inti efektif.",
    stimulusTitle: "Spesi Partikel Isoelektronik",
    stimulusText: "Diberikan beberapa spesi ion dan atom netral yang memiliki jumlah elektron sama (isoelektronik dengan konfigurasi gas mulia Neon, yaitu 10 elektron): ₈O²⁻, ₉F⁻, ₁₀Ne, ₁₁Na⁺, dan ₁₂Mg²⁺.",
    question: "Urutan spesi dari yang memiliki jari-jari TERKECIL hingga jari-jari TERBESAR adalah...",
    options: [
      { key: "A", text: "Mg²⁺ < Na⁺ < Ne < F⁻ < O²⁻" },
      { key: "B", text: "O²⁻ < F⁻ < Ne < Na⁺ < Mg²⁺" },
      { key: "C", text: "Ne < F⁻ < O²⁻ < Na⁺ < Mg²⁺" },
      { key: "D", text: "Mg²⁺ < Na⁺ < O²⁻ < F⁻ < Ne" },
      { key: "E", text: "Na⁺ < Mg²⁺ < Ne < F⁻ < O²⁻" }
    ],
    correctKey: "A",
    explanation: {
      concept: "Pada spesi isoelektronik (jumlah elektron sama), semakin banyak jumlah proton di dalam inti, semakin besar muatan inti efektif (Z_eff), sehingga elektron ditarik lebih kuat ke arah inti dan jari-jarinya semakin kecil.",
      steps: [
        "Semua spesi memiliki 10 elektron.",
        "Jumlah proton masing-masing: Mg (12), Na (11), Ne (10), F (9), O (8).",
        "Mg²⁺ memiliki 12 proton untuk menarik 10 elektron → gaya tarik inti paling kuat → jari-jari paling KECIL.",
        "O²⁻ hanya memiliki 8 proton untuk menarik 10 elektron → gaya tarik inti paling lemah serta tolakan antarelektron besar → jari-jari paling BESAR.",
        "Urutan dari terkecil ke terbesar: Mg²⁺ < Na⁺ < Ne < F⁻ < O²⁻."
      ],
      conclusion: "Jawaban yang benar adalah A."
    },
    difficulty: "Sedang"
  },
  {
    id: 3,
    code: "TKA-KIM-03",
    topic: "Ikatan Kimia & Bentuk Molekul",
    subtopic: "Hibridisasi & Kepolaran Molekul",
    competency: "Memprediksi bentuk geometri molekul dan kepolaran berdasarkan teori VSEPR / domain elektron.",
    stimulusTitle: "Karakteristik Senyawa Belerang dan Klorin",
    stimulusText: "Dua molekul senyawa kovalen yaitu belerang tetrafluorida (SF₄) dan karbon tetraklorida (CCl₄) memiliki rumus tipe molekul AX₄. Namun kedua senyawa tersebut memiliki sifat kepolaran dan geometri ruang yang sangat berbeda.",
    question: "Pernyataan yang PALING TEPAT mengenai perbedaan molekul SF₄ dan CCl₄ adalah...",
    options: [
      { key: "A", text: "SF₄ bersifat polar dengan bentuk bidang empat terdistorsi (jungkat-jungkit), sedangkan CCl₄ bersifat nonpolar dengan bentuk tetrahedral sempurna." },
      { key: "B", text: "Kedua senyawa sama-sama bersifat nonpolar karena memiliki 4 atom yang terikat pada atom pusat." },
      { key: "C", text: "SF₄ bersifat nonpolar karena simetris, sedangkan CCl₄ bersifat polar karena keelektronegatifan klorin sangat tinggi." },
      { key: "D", text: "Atom pusat S pada SF₄ tidak memiliki pasangan elektron bebas (PEB = 0), sehingga bentuk molekulnya bujur sangkar." },
      { key: "E", text: "CCl₄ memiliki momen dipol permanen (μ > 0) akibat perbedaan elektronegativitas C dan Cl." }
    ],
    correctKey: "A",
    explanation: {
      concept: "Teori Domain Elektron (VSEPR): Kepolaran ditentukan oleh momen dipol dan simetri geometri molekul akibat ada tidaknya Pasangan Elektron Bebas (PEB).",
      steps: [
        "Pada SF₄: Atom pusat S (golongan VIA, 6 elektron valensi). Membentuk 4 ikatan kovalen tunggal dengan F (memakai 4e⁻). Tersisa 2e⁻ tidak berikatan = 1 PEB.",
        "Tipe molekul SF₄ adalah AX₄E (5 domain elektron). Bentuk molekulnya adalah jungkat-jungkit (seesaw / tetrahedral terdistorsi). Karena asimetris dan memiliki PEB, momen dipol μ ≠ 0 → POLAR.",
        "Pada CCl₄: Atom pusat C (golongan IVA, 4 elektron valensi). Membentuk 4 ikatan tunggal dengan Cl (memakai 4e⁻). Tidak ada sisa elektron bebas (PEB = 0).",
        "Tipe molekul CCl₄ adalah AX₄ (4 domain elektron). Bentuk molekul tetrahedral sempurna simetris, resultan momen dipol saling meniadakan (μ = 0) → NONPOLAR."
      ],
      conclusion: "Jawaban yang benar adalah A."
    },
    difficulty: "HOTS / Sulit"
  },
  {
    id: 4,
    code: "TKA-KIM-04",
    topic: "Konfigurasi Elektron & Bilangan Kuantum",
    subtopic: "Aturan Hund, Asas Pauli, dan Eksitasi",
    competency: "Menentukan empat bilangan kuantum elektron terakhir suatu unsur transisi dan sifat kemagnetannya.",
    stimulusTitle: "Ion Logam Transisi Periode 4",
    stimulusText: "Ion M³⁺ dari suatu logam transisi memiliki konfigurasi elektron terluar berakhir pada subkulit 3d³. Logam ini banyak digunakan sebagai paduan baja tahan karat dan pigmen warna.",
    question: "Nomor atom (Z) dari logam M tersebut dan harga keempat bilangan kuantum untuk elektron terakhir pada atom netral M adalah...",
    options: [
      { key: "A", text: "Z = 24 ; n = 3, l = 2, m = +2, s = +½" },
      { key: "B", text: "Z = 24 ; n = 4, l = 0, m = 0, s = -½" },
      { key: "C", text: "Z = 26 ; n = 3, l = 2, m = -2, s = -½" },
      { key: "D", text: "Z = 27 ; n = 4, l = 1, m = 0, s = +½" },
      { key: "E", text: "Z = 21 ; n = 3, l = 2, m = -1, s = +½" }
    ],
    correctKey: "A",
    explanation: {
      concept: "Pada ionisasi logam transisi, elektron pada subkulit 4s dilepaskan terlebih dahulu sebelum elektron pada subkulit 3d.",
      steps: [
        "Konfigurasi ion M³⁺ = [Ar] 3d³ (total elektron pada ion = 18 + 3 = 21 elektron).",
        "Maka atom netral M memiliki 21 + 3 = 24 elektron (Nomor atom Z = 24, yaitu unsur Kromium / Cr).",
        "Ingat anomali kestabilan orbital d setengah penuh: Konfigurasi netral Cr (Z=24) adalah [Ar] 3d⁵ 4s¹ (bukan 3d⁴ 4s²).",
        "Elektron terakhir yang masuk menurut aturan pengisian tingkat energi (Aufbau) berada pada subkulit 3d⁵.",
        "Untuk 3d⁵: n = 3, l = 2 (subkulit d). Lima orbital (m = -2, -1, 0, +1, +2) masing-masing terisi 1 elektron dengan spin sejajar ↑ (aturan Hund).",
        "Elektron ke-5 menempati orbital m = +2 dengan spin s = +½."
      ],
      conclusion: "Jawaban yang tepat adalah A: Z = 24 dengan n = 3, l = 2, m = +2, s = +½."
    },
    difficulty: "HOTS / Sulit"
  },
  {
    id: 5,
    code: "TKA-KIM-05",
    topic: "Hukum Dasar Kimia & Stoikiometri",
    subtopic: "Penentuan Rumus Empiris dan Molekul Gas",
    competency: "Menerapkan Hukum Gay-Lussac dan Avogadro untuk menentukan rumus molekul senyawa hidrokarbon pembakaran.",
    stimulusTitle: "Eksperimen Pembakaran Gas Hidrokarbon",
    stimulusText: "Sebanyak 20 mL suatu gas hidrokarbon (C_x H_y) dibakar sempurna dengan 140 mL gas oksigen berlebih. Setelah reaksi selesai dan uap air diembunkan, tersisa 100 mL campuran gas. Jika campuran gas tersebut dialirkan ke dalam larutan air kapur Ca(OH)₂, volume gas berkurang sebesar 60 mL karena terbentuk endapan kapur CaCO₃ (semua gas diukur pada P dan T yang sama).",
    question: "Rumus molekul gas hidrokarbon tersebut adalah...",
    options: [
      { key: "A", text: "C₂H₆ (Etana)" },
      { key: "B", text: "C₃H₈ (Propana)" },
      { key: "C", text: "C₃H₆ (Propena)" },
      { key: "D", text: "C₄H₁₀ (Butana)" },
      { key: "E", text: "C₄H₈ (Butena)" }
    ],
    correctKey: "B",
    explanation: {
      concept: "Hukum Gay-Lussac: Pada P dan T sama, perbandingan volume gas pereaksi dan hasil reaksi berbanding lurus sebagai bilangan bulat sederhana (sebanding dengan koefisien reaksi).",
      steps: [
        "Gas yang diserap air kapur adalah CO₂. Maka volume CO₂ yang dihasilkan = 60 mL.",
        "Volume gas sisa = 100 mL, di mana 60 mL adalah CO₂, maka sisa gas O₂ yang tidak bereaksi = 100 - 60 = 40 mL.",
        "Volume O₂ yang bereaksi = Volume O₂ mula-mula - Volume O₂ sisa = 140 mL - 40 mL = 100 mL.",
        "Perbandingan volume reaksi: V(C_x H_y) : V(O₂) : V(CO₂) = 20 mL : 100 mL : 60 mL = 1 : 5 : 3.",
        "Persamaan reaksi: 1 C_x H_y + 5 O₂ → 3 CO₂ + (y/2) H₂O.",
        "Penyetaraan atom C: x = 3.",
        "Penyetaraan atom O: 5 × 2 = (3 × 2) + (y/2) → 10 = 6 + (y/2) → y/2 = 4 → y = 8.",
        "Maka rumus hidrokarbon adalah C₃H₈ (Propana)."
      ],
      conclusion: "Jawaban yang benar adalah B (C₃H₈)."
    },
    difficulty: "HOTS / Sulit"
  },
  {
    id: 6,
    code: "TKA-KIM-06",
    topic: "Sifat Keperiodikan & Kimia Unsur",
    subtopic: "Reaktivitas Halogen & Daya Desak Redoks",
    competency: "Menganalisis reaksi pendesakan halogen berdasarkan harga potensial reduksi standar (E°).",
    stimulusTitle: "Reaksi Spontanitas Halogen",
    stimulusText: "Di laboratorium kimia SMA, seorang siswa menguji kemampuan halogen (F₂, Cl₂, Br₂, I₂) dalam mendesak ion halida lain dari larutan garamnya.",
    question: "Di antara campuran pereaksi berikut, reaksi yang TIDAK DAPAT berlangsung spontan adalah...",
    options: [
      { key: "A", text: "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(l)" },
      { key: "B", text: "Br₂(l) + 2KI(aq) → 2KBr(aq) + I₂(s)" },
      { key: "C", text: "F₂(g) + 2NaCl(aq) → 2NaF(aq) + Cl₂(g)" },
      { key: "D", text: "I₂(s) + 2NaCl(aq) → 2NaI(aq) + Cl₂(g)" },
      { key: "E", text: "Cl₂(g) + 2NaI(aq) → 2NaCl(aq) + I₂(s)" }
    ],
    correctKey: "D",
    explanation: {
      concept: "Daya oksidasi halogen berkurang dari atas ke bawah (F₂ > Cl₂ > Br₂ > I₂). Halogen yang terletak lebih atas dalam golongan VIIA dapat mendesak/mengoksidasi ion halida yang terletak di bawahnya.",
      steps: [
        "Opsi A: Cl₂ mendesak Br⁻ (Cl di atas Br → SPONTAN).",
        "Opsi B: Br₂ mendesak I⁻ (Br di atas I → SPONTAN).",
        "Opsi C: F₂ mendesak Cl⁻ (F di atas Cl → SPONTAN).",
        "Opsi D: I₂ mendesak Cl⁻. Iodin berada di bawah klorin, daya oksidasinya lebih lemah (E° I₂/I⁻ = +0.54 V vs E° Cl₂/Cl⁻ = +1.36 V). Reaksi bernilai E°sel < 0 sehingga TIDAK SPONTAN.",
        "Opsi E: Cl₂ mendesak I⁻ (Cl di atas I → SPONTAN)."
      ],
      conclusion: "Jawaban yang benar adalah D."
    },
    difficulty: "Sedang"
  },
  {
    id: 7,
    code: "TKA-KIM-07",
    topic: "Struktur Atom & Sifat Keperiodikan",
    subtopic: "Anomali Energi Ionisasi Periode 2 dan 3",
    competency: "Menjelaskan penyimpangan tren energi ionisasi akibat konfigurasi orbital penuh dan setengah penuh.",
    stimulusTitle: "Grafik Energi Ionisasi Pertama Periode 3",
    stimulusText: "Secara umum energi ionisasi pertama unsur-unsur periode 3 meningkat dari kiri ke kanan. Namun terdapat dua anomali di mana IE Mg (738 kJ/mol) lebih tinggi daripada IE Al (578 kJ/mol), dan IE P (1012 kJ/mol) lebih tinggi daripada IE S (1000 kJ/mol).",
    question: "Faktor utama yang menyebabkan energi ionisasi fosforus (₁₅P) lebih tinggi daripada belerang (₁₆S) adalah...",
    options: [
      { key: "A", text: "Jari-jari atom fosforus jauh lebih besar daripada belerang." },
      { key: "B", text: "Subkulit 3p pada atom fosforus terisi setengah penuh (3p³), yang memberikan kestabilan ekstra dibandingkan subkulit 3p⁴ pada belerang." },
      { key: "C", text: "Belerang memiliki jumlah proton lebih sedikit sehingga muatan inti efektifnya lebih lemah." },
      { key: "D", text: "Fosforus merupakan unsur nonlogam sedangkan belerang merupakan metaloid." },
      { key: "E", text: "Elektron valensi belerang terletak pada kulit n=4, sedangkan fosforus pada kulit n=3." }
    ],
    correctKey: "B",
    explanation: {
      concept: "Kaidah kestabilan simetri orbital: Konfigurasi subkulit terisi penuh (s², p⁶, d¹⁰) atau setengah penuh (p³, d⁵) memiliki pertukaran energi dan simetri yang tinggi sehingga lebih stabil.",
      steps: [
        "Konfigurasi P (Z=15): [Ne] 3s² 3p³ (subkulit 3p terisi setengah penuh, masing-masing orbital memiliki 1e⁻ spin sejajar).",
        "Konfigurasi S (Z=16): [Ne] 3s² 3p⁴ (ada satu pasangan elektron berpasangan pada orbital 3p).",
        "Elektron yang berpasangan pada orbital yang sama di atom S mengalami tolakan elektrostatik (electron-electron repulsion), sehingga lebih mudah dilepaskan dibandingkan elektron pada atom P.",
        "Akibatnya, energi yang dibutuhkan untuk melepaskan elektron terluar dari atom P menjadi lebih besar daripada atom S."
      ],
      conclusion: "Jawaban yang benar adalah B."
    },
    difficulty: "Sedang"
  },
  {
    id: 8,
    code: "TKA-KIM-08",
    topic: "Hukum Dasar Kimia & Larutan Elektrolit",
    subtopic: "Stoikiometri Titrasi Asam Basa & Penentuan Konsentrasi",
    competency: "Menganalisis data titrasi asam-basa untuk menentukan konsentrasi sampel larutan.",
    stimulusTitle: "Data Titrasi Asam Sulfat dengan Natrium Hidroksida",
    stimulusText: "Sebanyak 25 mL sampel larutan H₂SO₄ dititrasi menggunakan larutan baku NaOH 0.1 M dengan indikator fenolftalein (PP). Percobaan diulang sebanyak 3 kali menghasilkan data volume NaOH sebagai berikut:\n• Titrasi 1: 20.1 mL\n• Titrasi 2: 19.9 mL\n• Titrasi 3: 20.0 mL",
    question: "Konsentrasi molaritas (M) dari larutan asam sulfat tersebut adalah...",
    options: [
      { key: "A", text: "0.040 M" },
      { key: "B", text: "0.080 M" },
      { key: "C", text: "0.020 M" },
      { key: "D", text: "0.160 M" },
      { key: "E", text: "0.050 M" }
    ],
    correctKey: "A",
    explanation: {
      concept: "Titik Ekivalen Titrasi Asam-Basa: mol ekuivalen asam = mol ekuivalen basa (V_a × M_a × valensi_a = V_b × M_b × valensi_b).",
      steps: [
        "Hitung volume rata-rata NaOH: (20.1 + 19.9 + 20.0) / 3 = 20.0 mL.",
        "Asam sulfat (H₂SO₄) merupakan asam bervalensi 2 (menghasilkan 2 ion H⁺), maka valensi_a = 2.",
        "Natrium hidroksida (NaOH) merupakan basa bervalensi 1 (menghasilkan 1 ion OH⁻), maka valensi_b = 1.",
        "Gunakan rumus ekuivalensi: V_a × M_a × a = V_b × M_b × b.",
        "25 mL × M_a × 2 = 20.0 mL × 0.1 M × 1.",
        "50 × M_a = 2.0 → M_a = 2.0 / 50 = 0.040 M."
      ],
      conclusion: "Jawaban yang benar adalah A (0.040 M)."
    },
    difficulty: "Mudah"
  }
];
