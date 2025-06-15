/**
 * Custom AI Assistant for Stunting Calculator
 * This file contains the logic for our custom generative AI assistant
 * that provides recommendations based on child growth assessment
 */

class StuntingAI {
  constructor() {
    this.responses = {
      // Respons untuk kondisi stunting normal dengan berat normal
      normalHeightNormalWeight: {
        title: "Pertumbuhan Normal",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Normal**: Berat badan anak Anda berada dalam rentang sehat untuk usianya."
        ],
        conclusion: "Anak Anda memiliki pertumbuhan yang optimal, dengan tinggi dan berat badan yang sesuai dengan usianya.",
        recommendations: [
          "**Pertahankan Pola Makan Seimbang**: Teruskan memberi anak makanan bergizi seimbang yang mencakup protein, karbohidrat kompleks, lemak sehat, serta buah dan sayuran.",
          "**Aktivitas Fisik Teratur**: Dorong anak untuk tetap aktif sesuai usianya melalui bermain dan bergerak.",
          "**Pemeriksaan Rutin**: Tetap lakukan pemeriksaan tumbuh kembang secara berkala dengan tenaga kesehatan.",
          "**Stimulasi Perkembangan**: Berikan stimulasi yang sesuai dengan tahap perkembangannya untuk mendukung pertumbuhan optimal."
        ]
      },

      // Respons untuk kondisi stunting normal dengan berat berlebih
      normalHeightOverweight: {
        title: "Normal dengan Kelebihan Berat Badan",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Berlebih**: Berat badan anak Anda berada di atas rentang normal untuk usianya."
        ],
        conclusion: "Meskipun status stunting anak Anda normal, berat badannya lebih tinggi dibandingkan anak seusianya. Ini perlu perhatian khusus.",
        recommendations: [
          "**Konsultasi dengan Ahli Gizi atau Dokter**: Dapatkan saran profesional untuk manajemen berat badan yang aman untuk anak.",
          "**Evaluasi Pola Makan**: Periksa ukuran porsi dan jenis makanan yang dikonsumsi anak.",
          "**Batasi Makanan Olahan**: Kurangi konsumsi makanan tinggi gula, lemak jenuh, dan makanan olahan.",
          "**Tingkatkan Aktivitas Fisik**: Dorong anak untuk lebih aktif bergerak setiap hari dengan aktivitas yang menyenangkan.",
          "**Tetap Berikan Nutrisi Seimbang**: Jangan batasi makanan secara drastis, pastikan semua nutrisi penting tetap terpenuhi."
        ]
      },

      // Respons untuk kondisi stunting normal dengan berat kurang
      normalHeightUnderweight: {
        title: "Normal dengan Berat Badan Kurang",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Kurang**: Berat badan anak Anda berada di bawah rentang normal untuk usianya."
        ],
        conclusion: "Meskipun tinggi anak Anda normal, berat badannya perlu ditingkatkan untuk mencapai pertumbuhan optimal.",
        recommendations: [
          "**Tingkatkan Asupan Kalori**: Berikan makanan padat nutrisi dan tinggi kalori seperti alpukat, ikan, kacang-kacangan, dan produk susu penuh.",
          "**Makan Lebih Sering**: Tawarkan makanan utama dan camilan sehat lebih sering dalam porsi yang tidak terlalu besar.",
          "**Konsultasi Medis**: Kunjungi dokter untuk memastikan tidak ada masalah kesehatan yang mendasari.",
          "**Pantau Perkembangan**: Timbang berat anak secara teratur untuk memastikan ada kemajuan.",
          "**Hindari Junk Food**: Meskipun perlu meningkatkan kalori, tetap hindari makanan tidak sehat."
        ]
      },

      // Respons untuk kondisi stunting ringan dengan berat normal
      mildStuntingNormalWeight: {
        title: "Stunting Ringan dengan Berat Normal",
        interpretation: [
          "**Status Stunting: Ringan**: Tinggi badan anak Anda sedikit di bawah standar untuk usianya.",
          "**Berat Badan: Normal**: Berat badan anak Anda berada dalam rentang normal untuk usianya."
        ],
        conclusion: "Anak Anda menunjukkan tanda stunting ringan, yang berarti tinggi badannya sedikit di bawah standar untuk usianya, meskipun berat badannya normal.",
        recommendations: [
          "**Fokus pada Nutrisi Penunjang Pertumbuhan**: Berikan makanan kaya protein, kalsium, zinc, dan vitamin A dan D.",
          "**Konsumsi Protein Berkualitas**: Pastikan anak mendapatkan protein berkualitas dari telur, daging tanpa lemak, ikan, dan kacang-kacangan.",
          "**Suplementasi Jika Diperlukan**: Konsultasikan dengan dokter tentang kemungkinan suplementasi nutrisi.",
          "**Konsultasi dengan Ahli Gizi**: Dapatkan saran spesifik untuk meningkatkan pertumbuhan anak.",
          "**Perhatikan Higiene dan Sanitasi**: Cegah infeksi yang dapat menghambat pertumbuhan."
        ]
      },

      // Respons untuk kondisi stunting berat dengan berat normal
      severeStuntingNormalWeight: {
        title: "Stunting Berat - Perhatian Khusus Diperlukan",
        interpretation: [
          "**Status Stunting: Berat**: Tinggi badan anak Anda jauh di bawah standar untuk usianya.",
          "**Berat Badan: Normal**: Berat badan anak Anda berada dalam rentang normal untuk usianya."
        ],
        conclusion: "Anak Anda mengalami stunting berat, meskipun berat badannya normal untuk usianya. Ini memerlukan perhatian khusus.",
        recommendations: [
          "**Konsultasi Medis Segera**: Temui dokter anak untuk evaluasi menyeluruh dan rencana penanganan.",
          "**Program Nutrisi Intensif**: Ikuti program nutrisi khusus yang dirancang oleh ahli gizi.",
          "**Suplementasi Gizi**: Mungkin diperlukan suplementasi vitamin, mineral, atau formula khusus.",
          "**Pemantauan Rutin**: Lakukan pemeriksaan tumbuh kembang secara teratur.",
          "**Periksa Kondisi Medis Lain**: Stunting berat dapat terkait dengan kondisi medis tertentu yang perlu ditangani.",
          "**Dukungan Holistik**: Perhatikan juga aspek stimulasi, kesehatan lingkungan, dan dukungan psikososial."
        ]
      },

      // Respons untuk kondisi stunting berat dengan berat kurang
      severeStuntingWithUnderweight: {
        title: "Stunting Berat dengan Berat Badan Kurang",
        interpretation: [
          "**Status Stunting: Berat**: Tinggi badan anak Anda jauh di bawah standar untuk usianya.",
          "**Berat Badan: Kurang**: Berat badan anak Anda juga berada di bawah standar untuk usianya."
        ],
        conclusion: "Anak Anda mengalami stunting berat disertai dengan berat badan kurang. Kombinasi ini membutuhkan intervensi segera dan komprehensif.",
        recommendations: [
          "**Konsultasi Medis Segera**: Temui dokter anak untuk evaluasi menyeluruh dan penanganan intensif.",
          "**Program Nutrisi Prioritas**: Ikuti program nutrisi khusus yang dirancang oleh ahli gizi untuk mengatasi stunting dan berat badan kurang secara bersamaan.",
          "**Makanan Padat Gizi**: Berikan makanan dengan densitas nutrisi tinggi seperti telur, ikan, daging tanpa lemak, kacang-kacangan, dan susu.",
          "**Pola Makan Teratur**: Berikan 5-6 kali makan sehari (3 makanan utama + 2-3 camilan bergizi) untuk meningkatkan asupan kalori dan nutrisi.",
          "**Suplementasi Gizi**: Konsultasikan dengan dokter untuk suplementasi vitamin A, D, zink, zat besi dan kalsium sesuai kebutuhan.",
          "**Pencegahan Infeksi**: Pastikan kebersihan dan vaksinasi lengkap untuk mencegah infeksi yang dapat memperburuk kondisi.",
          "**Pemantauan Ketat**: Lakukan pemeriksaan tumbuh kembang secara teratur, idealnya setiap 2 minggu di awal intervensi."
        ]
      },
      
      // Respons untuk kondisi obesitas
      obesity: {
        title: "Obesitas - Perhatian Khusus Diperlukan",
        interpretation: [
          "**Status Berat: Obesitas**: Berat badan anak Anda jauh di atas normal untuk usianya.",
          "**Kondisi Ini Memerlukan Perhatian**: Obesitas pada anak dapat menyebabkan masalah kesehatan jangka panjang."
        ],
        conclusion: "Anak Anda mengalami obesitas, yang perlu ditangani secara hati-hati dengan pendekatan komprehensif untuk mencapai berat badan yang lebih sehat.",
        recommendations: [
          "**Konsultasi dengan Dokter Anak**: Dapatkan evaluasi menyeluruh dan panduan pengelolaan berat badan yang aman.",
          "**Perubahan Pola Makan Bertahap**: Fokus pada makanan bergizi, porsi yang tepat, dan mengurangi makanan olahan dan tinggi gula.",
          "**Aktivitas Fisik Teratur**: Tingkatkan aktivitas fisik secara bertahap melalui kegiatan yang menyenangkan.",
          "**Pendekatan Keluarga**: Libatkan seluruh keluarga dalam menerapkan gaya hidup sehat.",
          "**Hindari Diet Ketat**: Fokus pada pertumbuhan sehat, bukan penurunan berat badan drastis.",
          "**Dukungan Psikologis**: Perhatikan aspek psikologis dan citra diri anak."
        ]
      }
    };    // Respons umum tentang stunting
    this.generalInfo = {
      whatIsStunting: {
        title: "Apa itu Stunting?",
        content: [
          "**Stunting adalah** kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama pada 1.000 hari pertama kehidupan (sejak janin hingga anak berusia 2 tahun).",
          "**Secara teknis**, stunting didefinisikan sebagai kondisi dimana tinggi badan anak berada di bawah -2 standar deviasi dari median tinggi badan menurut usia berdasarkan standar WHO.",
          "**Dampak stunting** tidak hanya pada fisik anak (tinggi badan yang rendah), tetapi juga pada perkembangan otak, yang dapat mempengaruhi kemampuan kognitif dan prestasi akademik di masa depan."
        ]
      },
      stuntingCauses: {
        title: "Penyebab Stunting",
        content: [
          "**Kekurangan gizi kronis** selama masa kehamilan dan awal kehidupan anak.",
          "**Infeksi berulang** seperti diare, cacingan, dan infeksi saluran pernapasan yang mengganggu penyerapan nutrisi.",
          "**Praktik pemberian makan yang buruk**, termasuk ASI eksklusif yang kurang, MPASI yang tidak adekuat, dan keragaman makanan yang rendah.",
          "**Sanitasi dan kebersihan yang buruk** meningkatkan risiko infeksi dan penyakit.",
          "**Faktor sosial ekonomi** seperti kemiskinan dan akses terbatas ke layanan kesehatan.",
          "**Faktor maternal** termasuk status gizi ibu sebelum dan selama kehamilan, serta kesehatan ibu secara umum."
        ]
      },
      stuntingPrevention: {
        title: "Pencegahan Stunting",
        content: [
          "**Nutrisi optimal ibu** sebelum dan selama kehamilan serta saat menyusui.",
          "**ASI eksklusif selama 6 bulan pertama** dilanjutkan dengan MPASI yang adekuat hingga usia 2 tahun atau lebih.",
          "**Makanan Pendamping ASI (MPASI)** yang tepat waktu, adekuat, aman, dan berkualitas mulai usia 6 bulan.",
          "**Pemantauan pertumbuhan rutin** untuk deteksi dini masalah pertumbuhan.",
          "**Pola asuh yang responsif** dan stimulasi yang baik untuk perkembangan anak.",
          "**Praktik sanitasi dan kebersihan yang baik** termasuk mencuci tangan, air bersih, dan sanitasi layak.",
          "**Imunisasi lengkap** dan pencegahan serta penanganan penyakit yang tepat."
        ]
      },
      vitaminsForStunting: {
        title: "Vitamin dan Suplemen untuk Mencegah Stunting",
        content: [
          "**Vitamin A**: Penting untuk kesehatan mata, pertumbuhan tulang, dan sistem kekebalan tubuh. Sumber: wortel, bayam, pepaya, mangga, hati, dan telur.",
          "**Vitamin D**: Membantu penyerapan kalsium dan fosfor untuk pertumbuhan tulang. Sumber: sinar matahari pagi, ikan berlemak, kuning telur, dan produk susu yang difortifikasi.",
          "**Vitamin B Kompleks**: Mendukung metabolisme dan pertumbuhan sel. Sumber: daging tanpa lemak, kacang-kacangan, biji-bijian utuh, dan sayuran hijau.",
          "**Asam Folat**: Penting untuk pembentukan sel baru. Sumber: sayuran hijau, kacang-kacangan, biji-bijian utuh, dan buah jeruk.",
          "**Kalsium**: Sangat penting untuk pembentukan tulang dan gigi. Sumber: susu, keju, yogurt, ikan teri, dan sayuran hijau gelap.",
          "**Zat Besi**: Mencegah anemia yang dapat menghambat pertumbuhan. Sumber: daging merah, hati, kacang-kacangan, bayam, dan makanan yang difortifikasi.",
          "**Zinc**: Penting untuk pertumbuhan dan sistem kekebalan tubuh. Sumber: daging, makanan laut, kacang-kacangan, dan biji-bijian utuh.",
          "**Protein**: Blok bangunan penting untuk pertumbuhan dan perbaikan jaringan. Sumber: telur, daging, ikan, susu, kedelai, dan kacang-kacangan."
        ]
      },
      exerciseForChildren: {
        title: "Aktivitas Fisik untuk Mendukung Pertumbuhan Optimal",
        content: [
          "**Untuk Bayi (0-1 tahun)**:",
          "• **Tummy Time**: Letakkan bayi tengkurap saat terjaga untuk memperkuat leher dan bahu",
          "• **Gerakan Bebas**: Berikan waktu bagi bayi untuk bergerak bebas di lantai yang aman",
          "• **Aktivitas Air**: Pengenalan ke air dalam suhu yang tepat dapat membantu perkembangan motorik",
          
          "**Untuk Balita (1-3 tahun)**:",
          "• **Berjalan dan Berlari**: Dorong anak untuk aktif bergerak di taman bermain",
          "• **Permainan Lempar Bola**: Membantu koordinasi dan kekuatan otot",
          "• **Menari**: Aktivitas menyenangkan yang melatih keseimbangan dan koordinasi",
          
          "**Untuk Anak Prasekolah (3-5 tahun)**:",
          "• **Bersepeda dengan Roda Bantuan**: Membangun kekuatan kaki dan keseimbangan",
          "• **Berenang**: Olahraga yang baik untuk seluruh tubuh",
          "• **Permainan Aktif**: Seperti kejar-kejaran, lompat tali, atau bermain bola"
        ]
      },
      nutritionalPrograms: {
        title: "Program Nutrisi untuk Pencegahan Stunting",
        content: [
          "**Program 1000 Hari Pertama Kehidupan**:",
          "• Fokus pada nutrisi ibu hamil dan menyusui",
          "• Pemantauan pertumbuhan bayi secara teratur",
          "• Edukasi tentang MPASI yang tepat",
          
          "**Pemberian Makanan Tambahan (PMT)**:",
          "• PMT untuk ibu hamil dan menyusui Kurang Energi Kronis (KEK)",
          "• PMT untuk balita kekurangan gizi",
          "• Biskuit atau makanan padat gizi lainnya",
          
          "**Suplementasi Gizi Mikro**:",
          "• Tablet tambah darah untuk ibu hamil",
          "• Kapsul vitamin A untuk balita",
          "• Taburia (sprinkle) yang mengandung berbagai mikronutrien",
          
          "**Program Air Bersih dan Sanitasi (WASH)**:",
          "• Akses terhadap air bersih",
          "• Sanitasi yang layak",
          "• Praktik kebersihan seperti cuci tangan pakai sabun"
        ]
      }
    };
    
    // Tambahan responses untuk pertanyaan umum
    this.generalResponses = {
      vitamin: {
        title: "Vitamin dan Suplemen untuk Pencegahan Stunting",
        content: `Untuk mendukung pencegahan stunting dan kesehatan optimal, berikut beberapa vitamin dan suplemen yang direkomendasikan:

1. Vitamin A: 
   • Penting untuk pertumbuhan, perkembangan, dan fungsi kekebalan tubuh
   • Sumber: wortel, ubi jalar, bayam, telur, susu

2. Vitamin D: 
   • Membantu penyerapan kalsium dan penting untuk pertumbuhan tulang
   • Sumber: sinar matahari, ikan berlemak, kuning telur, susu yang difortifikasi

3. Kalsium: 
   • Penting untuk pembentukan tulang dan gigi yang kuat
   • Sumber: susu, keju, yogurt, ikan teri, tahu yang diolah dengan kalsium

4. Zinc: 
   • Mendukung pertumbuhan dan sistem kekebalan tubuh
   • Sumber: daging merah, unggas, kacang-kacangan, biji-bijian

5. Zat Besi: 
   • Mencegah anemia dan mendukung perkembangan otak
   • Sumber: daging merah, hati, bayam, kacang-kacangan

6. Asam Folat: 
   • Sangat penting untuk pertumbuhan sel dan perkembangan jaringan
   • Sumber: sayuran hijau, kacang-kacangan, buah jeruk

Namun, sebaiknya konsumsi suplemen dilakukan setelah berkonsultasi dengan dokter atau ahli gizi untuk mendapatkan dosis yang tepat sesuai kebutuhan individu.`
      },
      nutrition: {
        title: "Pola Makan Seimbang untuk Mencegah Stunting",
        content: `Pola makan seimbang untuk mencegah stunting dan mendukung pertumbuhan optimal:

1. Protein Berkualitas:
   • Telur, ikan, daging tanpa lemak, tahu, tempe
   • Penting untuk pertumbuhan dan pembentukan otot

2. Karbohidrat Kompleks:
   • Nasi merah, roti gandum, ubi, kentang
   • Sumber energi yang stabil

3. Lemak Sehat:
   • Alpukat, kacang-kacangan, minyak zaitun
   • Penting untuk perkembangan otak

4. Sayuran dan Buah-buahan:
   • Minimal 5 porsi sehari dengan beragam warna
   • Sumber vitamin, mineral dan antioksidan

5. Susu dan Produk Susu:
   • Sumber kalsium untuk pertumbuhan tulang
   • 2-3 porsi sehari

Makan dengan teratur 3 kali sehari plus 2 camilan sehat dan hindari makanan olahan tinggi gula, garam dan lemak trans.`
      },
      growth: {
        title: "Faktor yang Mempengaruhi Pertumbuhan",
        content: `Pertumbuhan tinggi badan anak dipengaruhi oleh berbagai faktor:

1. Genetik/keturunan: Memengaruhi sekitar 60-80% potensi tinggi badan

2. Nutrisi: Asupan protein, kalsium, vitamin D, dan zinc sangat penting untuk pertumbuhan optimal

3. Hormon pertumbuhan: Diproduksi oleh kelenjar pituitari, sangat aktif saat tidur

4. Aktivitas fisik: Merangsang produksi hormon pertumbuhan dan memperkuat tulang

5. Kualitas tidur: Waktu tidur yang cukup meningkatkan produksi hormon pertumbuhan

6. Kesehatan umum: Infeksi kronis atau penyakit dapat menghambat pertumbuhan

Tips meningkatkan pertumbuhan:
• Pastikan anak mendapat nutrisi seimbang
• Dorong aktivitas fisik teratur
• Jaga kualitas tidur (10-12 jam untuk anak kecil)
• Periksa kesehatan secara berkala
• Hindari stres berlebihan yang dapat memengaruhi pertumbuhan`
      },
      activity: {
        title: "Aktivitas Fisik untuk Mendukung Pertumbuhan",
        content: `Aktivitas fisik yang direkomendasikan untuk mendukung pertumbuhan optimal anak:

Untuk bayi (0-12 bulan):
• Waktu tengkurap dengan pengawasan
• Permainan interaktif yang menggerakkan tangan dan kaki
• Stimulasi sensori dengan mainan berwarna-warni dan bertekstur

Untuk batita (1-3 tahun):
• Aktivitas aktif minimal 180 menit sehari
• Bermain di luar ruangan: berlari, melompat, melempar bola
• Aktivitas yang melatih keseimbangan, seperti berjalan di atas garis

Untuk anak prasekolah (3-5 tahun):
• Aktivitas aktif 180 menit sehari, termasuk 60 menit aktivitas energik
• Bermain di taman bermain: panjat, ayunan, seluncuran
• Permainan kelompok sederhana seperti kejar-kejaran
• Aktivitas yang mengembangkan koordinasi seperti menendang/melempar bola

Tips penerapan:
• Jadikan aktivitas fisik menyenangkan, bukan kewajiban
• Batasi waktu di depan layar (TV, gadget)
• Jadi teladan dengan aktif bersama anak
• Sesuaikan aktivitas dengan minat dan kemampuan anak
• Berikan pujian untuk upaya, bukan hanya hasil`
      },
      greeting: {
        title: "Selamat Datang di Stuntify Bot",
        content: `Halo! Saya Stuntify Bot, asisten kesehatan yang siap membantu Anda dengan informasi seputar:
• Stunting dan pencegahannya
• Pertumbuhan anak yang optimal
• Rekomendasi nutrisi dan vitamin
• Pola makan sehat untuk anak
• Aktivitas fisik untuk mendukung pertumbuhan
• Tips pemantauan pertumbuhan anak

Apa yang ingin Anda ketahui tentang kesehatan dan pencegahan stunting pada anak hari ini?`
      },
      default: {
        title: "Bantuan Stuntify Bot",
        content: `Terima kasih atas pertanyaan Anda. Untuk memberikan informasi yang akurat, saya perlu memahami pertanyaan Anda dengan lebih jelas.

Anda bisa bertanya tentang:
• Apa itu stunting dan bagaimana mencegahnya
• Faktor-faktor yang memengaruhi pertumbuhan anak
• Rekomendasi vitamin dan nutrisi untuk anak
• Pola makan sehat untuk mencegah stunting
• Aktivitas fisik yang mendukung pertumbuhan
• Cara memantau pertumbuhan anak secara efektif

Silakan ajukan pertanyaan Anda kembali dengan lebih spesifik.`
      },
      stunting: {
        title: "Apa itu Stunting?",
        content: `Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama dalam 1000 hari pertama kehidupan (dari kehamilan hingga usia 2 tahun).

Penyebab utama stunting:
• Kekurangan nutrisi selama kehamilan
• Pemberian ASI yang tidak optimal
• Makanan pendamping ASI yang tidak adekuat
• Infeksi berulang dan penyakit kronis
• Sanitasi dan kebersihan yang buruk

Dampak stunting:
• Penurunan perkembangan kognitif dan kecerdasan
• Penurunan produktivitas
• Peningkatan risiko penyakit tidak menular di masa dewasa
• Dampak ekonomi jangka panjang

Pencegahan stunting harus dimulai sejak masa kehamilan dengan memastikan ibu mendapat nutrisi yang cukup, pemberian ASI eksklusif selama 6 bulan pertama, pemberian MPASI yang tepat, serta menjaga kebersihan dan sanitasi lingkungan.`
      }
    };
  }
  // Metode untuk mendapatkan respons berdasarkan data anak
  getResponseForChild(data) {
    const { stunting_status, weight_status, height, age, gender, weight, name, ml_stunting_result, ml_wasting_result } = data;
    let responseTemplate;

    // Tentukan template respons berdasarkan status
    if (stunting_status === "Normal") {
      if (weight_status && weight_status.includes("Normal")) {
        responseTemplate = this.responses.normalHeightNormalWeight;
      } else if (weight_status && (weight_status.includes("Lebih") || weight_status.includes("Obesitas"))) {
        responseTemplate = this.responses.normalHeightOverweight;
      } else {
        responseTemplate = this.responses.normalHeightUnderweight;
      }
    } else if (stunting_status === "Stunting Ringan") {
      responseTemplate = this.responses.mildStuntingNormalWeight;
    } else if (stunting_status === "Stunting Berat" && weight_status && weight_status.includes("Kurang")) {
      responseTemplate = this.responses.severeStuntingWithUnderweight;
    } else {
      responseTemplate = this.responses.severeStunting;
    }

    if (weight_status === "Obesitas") {
      responseTemplate = this.responses.obesity;
    }

    // Gunakan format respons yang lebih detail dan profesional
    return this.formatResponseDetailed(responseTemplate, data);
  }

  // Format bagian suplemen menjadi teks yang dapat dibaca
  formatSupplementsSection(supplements) {
    if (!supplements || supplements.length === 0) {
      return "";
    }
    
    let section = "**Rekomendasi Vitamin & Suplemen:**\n\n";
    
    supplements.slice(0, 3).forEach((supplement, index) => {
      section += `${index+1}. **${supplement.name}**\n`;
      section += `   • Manfaat: ${supplement.benefits}\n`;
      section += `   • Sumber: ${supplement.sources}\n\n`;
    });
    
    section += "**Catatan:** Konsultasikan dengan dokter atau ahli gizi sebelum memberikan suplemen tambahan.";
    
    return section;
  }
  
  // Metode untuk memformat respons dengan data anak
  formatResponse(template, data) {
    const { title, interpretation, conclusion, recommendations } = template;
    const { height, age, gender, weight, stunting_status, weight_status } = data;
    
    // Informasi referensi (bisa diganti dengan data aktual dari WHO jika tersedia)
    const minNormalHeight = this.getMinNormalHeight(age, gender);
    const idealWeight = this.getIdealWeight(age, gender);
    
    let response = `**${title}**\n\n`;
    
    // Interpretasi data
    response += `**Interpretasi Data:**\n\n`;
    for (let item of interpretation) {
      response += `• ${item}\n\n`;
    }
    
    // Tambahkan detail spesifik tentang anak
    response += `• **Tinggi Badan**: ${height} cm (Usia ${age} bulan, ${gender}): `;
    if (stunting_status === "Normal") {
      response += `Tinggi badan ini berada dalam rentang normal untuk anak ${gender.toLowerCase()} usia ${age} bulan.\n\n`;
    } else if (stunting_status === "Stunting Ringan") {
      response += `Tinggi badan ini sedikit di bawah standar untuk anak ${gender.toLowerCase()} usia ${age} bulan (minimal normal sekitar ${minNormalHeight} cm).\n\n`;
    } else {
      response += `Tinggi badan ini jauh di bawah standar untuk anak ${gender.toLowerCase()} usia ${age} bulan (minimal normal sekitar ${minNormalHeight} cm).\n\n`;
    }
    
    // Tambahkan informasi berat jika tersedia
    if (weight) {
      response += `• **Berat Badan**: ${weight} kg (Usia ${age} bulan, ${gender}): `;
      if (weight_status.includes("Normal")) {
        response += `Berat badan ini berada dalam rentang normal untuk anak seusianya.\n\n`;
      } else if (weight_status.includes("Lebih") || weight_status.includes("Obesitas")) {
        response += `Berat badan ini di atas rata-rata untuk anak seusianya (ideal sekitar ${idealWeight} kg).\n\n`;
      } else {
        response += `Berat badan ini di bawah rata-rata untuk anak seusianya (ideal sekitar ${idealWeight} kg).\n\n`;
      }
    }
    
    // Kesimpulan
    response += `**Kesimpulan:**\n\n${conclusion}\n\n`;
    
    // Rekomendasi
    response += `**Rekomendasi:**\n\n`;
    for (let i = 0; i < recommendations.length; i++) {
      response += `${i+1}. ${recommendations[i]}\n\n`;
    }
    
    // Peringatan dan disclaimer
    response += `**Peringatan:**\n\n`;
    response += `• Informasi ini bersifat umum dan tidak menggantikan konsultasi medis langsung.\n\n`;
    response += `• Selalu konsultasikan dengan dokter atau ahli gizi untuk penanganan yang tepat.`;
    
    return response;
  }
  
  // Metode untuk memformat respons dengan format yang lebih profesional dan komprehensif
  formatResponseDetailed(template, data) {
    const { title, interpretation, conclusion, recommendations } = template;
    const { height, age, gender, weight, stunting_status, weight_status, name } = data;
    
    const childName = name || "Anak Anda";
    const ageYears = (age / 12).toFixed(1);
    
    let response = `Halo, orangtua dari ${childName}! 

Berdasarkan hasil pengukuran, ${childName} (${age} bulan / ${ageYears} tahun) memiliki kondisi: **${title}**

**Interpretasi Kondisi:**
${interpretation.join('\n')}

**Kesimpulan:**
${conclusion}

**Rekomendasi Tindakan:**
`;

    recommendations.forEach((rec, index) => {
      response += `${index + 1}. ${rec}\n`;
    });

    response += `
**Catatan Penting:**
• Informasi ini bersifat umum dan tidak menggantikan konsultasi medis langsung
• Selalu konsultasikan dengan dokter atau ahli gizi untuk penanganan yang tepat
• Pantau pertumbuhan anak secara berkala`;

    return response;
  }

  // Metode untuk mendapatkan respons berdasarkan pesan user
  getGeneralResponse(query) {
    const lowerCaseMessage = query.toLowerCase();
    
    if (lowerCaseMessage.includes("vitamin") || lowerCaseMessage.includes("suplemen")) {
      return this.generalResponses.vitamin.content;
    } else if (lowerCaseMessage.includes("makan") || lowerCaseMessage.includes("nutrisi") || lowerCaseMessage.includes("makanan")) {
      return this.generalResponses.nutrition.content;
    } else if (lowerCaseMessage.includes("stunting")) {
      return this.generalResponses.stunting.content;
    } else if (lowerCaseMessage.includes("pertumbuhan") || lowerCaseMessage.includes("tinggi badan")) {
      return this.generalResponses.growth.content;
    } else if (lowerCaseMessage.includes("aktivitas") || lowerCaseMessage.includes("bermain") || lowerCaseMessage.includes("olahraga")) {
      return this.generalResponses.activity.content;
    } else if (lowerCaseMessage.includes("terima kasih") || lowerCaseMessage.includes("makasih")) {
      return "Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain seputar kesehatan, nutrisi, atau pencegahan stunting, jangan ragu untuk bertanya kembali.";
    } else if (lowerCaseMessage.includes("halo") || lowerCaseMessage.includes("hai") || lowerCaseMessage.includes("hi")) {
      return this.generalResponses.greeting.content;
    } else {
      return this.generalResponses.default.content;
    }
  }

  // Metode untuk menghasilkan rekomendasi awal berdasarkan hasil analisis
  generateInitialRecommendation(status, height, age, minHeight, name, gender, weight, weightStatus) {
    const ageYears = (age / 12).toFixed(1);
    const heightDiff = minHeight - height;
    
    // Template respons berdasarkan kondisi
    const responseTemplates = {
      stuntingBeratWithUnderweight: () => {
        return `Halo, orangtua dari ${name}! 

Berdasarkan hasil pengukuran, ${name} memiliki kondisi stunting berat dengan tinggi ${height} cm (sekitar ${heightDiff.toFixed(1)} cm di bawah standar normal) dan juga berat badan kurang yaitu ${weight} kg.

Kondisi ini memerlukan perhatian medis segera karena kombinasi stunting berat dan berat badan kurang (yang disebut stunting dan wasting) membutuhkan penanganan komprehensif:

1. Evaluasi Kondisi:
   • Stunting berat menunjukkan adanya kekurangan gizi kronis jangka panjang
   • Segera konsultasikan ke dokter anak atau ahli gizi untuk evaluasi menyeluruh
   • Pemeriksaan darah mungkin diperlukan untuk mengidentifikasi kekurangan nutrisi spesifik

2. Rekomendasi Nutrisi:
   • Prioritaskan makanan padat nutrisi: telur, ikan, daging, susu, kacang-kacangan
   • Berikan makanan dengan densitas kalori tinggi: tambahkan minyak zaitun atau alpukat ke makanan
   • Suplementasi vitamin A, D, zink, dan zat besi sesuai anjuran dokter

3. Pola Makan:
   • Berikan 5-6 kali makan sehari (3 makanan utama + 2-3 snack bergizi)
   • Pastikan setiap makanan mengandung protein, karbohidrat kompleks dan lemak sehat
   • Hindari makanan "pengisi perut" seperti snack manis atau minuman manis

4. Aktivitas Fisik:
   • Dorong aktivitas yang menyenangkan seperti bermain di luar rumah
   • Fokus pada aktivitas yang membangun kekuatan otot secara bertahap
   • Pastikan istirahat dan tidur yang cukup (10-12 jam untuk balita)

5. Tips untuk Orangtua:
   • Pantau pertumbuhan secara teratur (setiap bulan) dengan kurva pertumbuhan WHO
   • Pertimbangkan program intervensi stunting dari puskesmas atau klinik gizi
   • Perhatikan kebersihan dan pencegahan infeksi yang bisa menghambat pertumbuhan

Penting untuk memahami bahwa perbaikan stunting memerlukan waktu dan konsistensi. Dengan penanganan yang tepat dan dini, masih ada kesempatan untuk mengejar ketertinggalan pertumbuhan, terutama jika anak masih di bawah 2 tahun (periode 1000 hari pertama kehidupan).`;
      },
      
      stuntingBerat: () => {
        return `Halo, orangtua dari ${name}! 

Berdasarkan hasil pengukuran, ${name} berada dalam kategori stunting berat dengan tinggi ${height} cm (sekitar ${heightDiff.toFixed(1)} cm di bawah standar normal untuk usianya).

Ini memerlukan perhatian khusus, namun jangan khawatir, masih banyak yang bisa dilakukan:

1. Evaluasi Kondisi:
   • Stunting berat menunjukkan kekurangan gizi kronis jangka panjang
   • Segera konsultasikan ke dokter anak untuk evaluasi menyeluruh
   • Pemeriksaan lebih lanjut mungkin diperlukan untuk mengetahui penyebab

2. Rekomendasi Nutrisi:
   • Prioritaskan makanan tinggi protein: telur, ikan, daging, susu, kacang-kacangan
   • Pastikan asupan kalsium dan vitamin D mencukupi untuk pertumbuhan tulang
   • Konsultasikan dengan dokter tentang suplementasi vitamin dan mineral

3. Pola Makan:
   • Berikan makanan dengan nutrisi tinggi dalam porsi kecil tapi sering
   • Pastikan setiap makanan mengandung protein dan kalsium
   • Tambahkan lemak sehat seperti minyak zaitun atau alpukat untuk meningkatkan kalori
   • Hindari junk food dan makanan rendah nutrisi

4. Aktivitas Fisik:
   • Dorong aktivitas fisik yang menyenangkan dan sesuai kemampuan
   • Latihan yang melibatkan berat badan dapat menstimulasi pertumbuhan tulang
   • Pastikan istirahat dan tidur yang cukup (10-12 jam per hari)

5. Tips untuk Orangtua:
   • Pantau pertumbuhan secara teratur setiap bulan
   • Cari dukungan dari program pemerintah untuk pencegahan stunting
   • Hindari infeksi berulang dengan menjaga kebersihan

Ingat bahwa perbaikan kondisi stunting memerlukan waktu dan konsistensi. Terutama jika anak masih di bawah 2 tahun, potensi untuk mengejar pertumbuhan optimal masih terbuka lebar.`;
      },
      
      stuntingRinganWithUnderweight: () => {
        return `Halo, orangtua dari ${name}! 

Hasil pengukuran menunjukkan bahwa ${name} mengalami stunting ringan dengan tinggi ${height} cm (sekitar ${heightDiff.toFixed(1)} cm di bawah standar normal) dan juga berat badan kurang yaitu ${weight} kg.

Kondisi ini memerlukan perhatian lebih untuk mendukung pertumbuhan yang optimal:

1. Evaluasi Kondisi:
   • Kombinasi stunting ringan dan berat badan kurang menunjukkan adanya kekurangan gizi
   • Pantau pertumbuhan setiap 2 minggu hingga kondisi membaik
   • Konsultasikan dengan dokter anak untuk evaluasi lengkap

2. Rekomendasi Nutrisi:
   • Perbanyak asupan protein: telur, ikan, daging, produk susu, kacang-kacangan
   • Berikan makanan padat energi seperti kentang, pasta, sereal utuh
   • Tambahkan sumber lemak sehat seperti alpukat, minyak zaitun, kacang-kacangan
   • Suplementasi vitamin A, D, dan mineral (zinc, zat besi) setelah konsultasi dengan dokter

3. Pola Makan:
   • Berikan makanan kecil tapi sering (5-6 kali sehari)
   • Setiap makanan utama harus mengandung protein, karbohidrat kompleks dan lemak sehat
   • Buatlah makanan menarik dan bervariasi untuk meningkatkan nafsu makan
   • Hindari minuman manis yang mengenyangkan tanpa memberikan nutrisi

4. Aktivitas Fisik:
   • Dorong aktivitas fisik ringan tetapi teratur
   • Batasi aktivitas berlebihan yang membakar kalori terlalu banyak
   • Pastikan tidur yang cukup untuk produksi hormon pertumbuhan

5. Tips untuk Orangtua:
   • Catat asupan makanan untuk mengidentifikasi pola makan yang perlu diperbaiki
   • Pantau berat dan tinggi badan setiap 2 minggu
   • Periksa adanya infeksi atau masalah kesehatan lain yang mempengaruhi nafsu makan
   • Pertimbangkan konsultasi dengan ahli gizi untuk rencana nutrisi khusus

Dengan penanganan yang tepat, stunting ringan dan berat badan kurang masih dapat diperbaiki dengan baik, terutama jika anak masih dalam periode emas pertumbuhan (di bawah 2 tahun). Tetap konsisten dan pantau kemajuannya secara teratur.`;
      },
      
      stuntingRingan: () => {
        return `Halo, orangtua dari ${name}! 

Hasil pengukuran menunjukkan bahwa ${name} mengalami stunting ringan dengan tinggi ${height} cm (sekitar ${heightDiff.toFixed(1)} cm di bawah standar normal untuk usianya).

Stunting ringan masih bisa diatasi dengan intervensi yang tepat. Berikut rekomendasinya:

1. Evaluasi Kondisi:
   • Stunting ringan mengindikasikan adanya keterlambatan pertumbuhan yang masih bisa dikejar
   • Lakukan pemantauan pertumbuhan rutin setiap bulan
   • Diskusikan dengan dokter anak untuk mendapatkan saran yang lebih personal

2. Rekomendasi Nutrisi & Vitamin:
   • Vitamin A, D dan mineral seperti kalsium, zinc dan zat besi
   • Protein berkualitas tinggi dari daging, unggas, ikan, telur, dan susu
   • Asam lemak esensial untuk perkembangan otak (dari ikan berlemak, alpukat)

3. Pola Makan Ideal:
   • Sajikan makanan dengan prinsip "isi piringku" (1/2 sayur dan buah, 1/4 protein, 1/4 karbohidrat)
   • Batasi makanan dan minuman tinggi gula, garam, dan lemak jenuh
   • Berikan air putih sebagai minuman utama
   • Jadwalkan waktu makan teratur 3x sehari dengan 2x camilan sehat

4. Aktivitas Fisik yang Disarankan:
   • Mendorong aktivitas fisik minimal 60-180 menit sehari sesuai usia
   • Aktivitas yang menyenangkan seperti berlari, bermain bola, berenang, atau bersepeda
   • Batasi waktu di depan layar (TV, tablet, smartphone)
   • Pastikan tidur yang cukup (10-12 jam untuk balita, 9-10 jam untuk anak-anak)

5. Tips Pemantauan:
   • Dokumentasikan pertumbuhan dengan buku KIA atau aplikasi pemantauan tumbuh kembang
   • Perhatikan tanda-tanda perkembangan motorik dan kognitif sesuai usia
   • Diskusikan pertumbuhan anak saat kunjungan rutin ke dokter anak

Pertahankan pola hidup dan makan sehat ini untuk memastikan ${name} tetap tumbuh optimal dan terhindar dari stunting di masa mendatang.`;
      }
    };
    
    // Tentukan respons berdasarkan kondisi
    if (status === 'Stunting Berat' && weightStatus && weightStatus.status.includes('Kurang')) {
      return responseTemplates.stuntingBeratWithUnderweight();
    } else if (status === 'Stunting Berat') {
      return responseTemplates.stuntingBerat();
    } else if (status === 'Stunting Ringan' && weightStatus && weightStatus.status.includes('Kurang')) {
      return responseTemplates.stuntingRinganWithUnderweight();
    } else if (status === 'Stunting Ringan') {
      return responseTemplates.stuntingRingan();
    } else {
      return responseTemplates.normal();
    }
  }

  // Get minimum normal height based on age and gender
  getMinNormalHeight(age, gender) {
    // Access the global stuntingReference object if defined in the global scope
    if (typeof stuntingReference !== 'undefined') {
      const ageAsNumber = parseInt(age);
      const genderIndex = gender === "Laki-laki" ? 0 : 1;
      
      if (stuntingReference[ageAsNumber]) {
        return stuntingReference[ageAsNumber][genderIndex];
      }
    }
    
    // Fallback to estimated calculation if stuntingReference is not available
    const baseHeight = gender === "Laki-laki" ? 50.0 : 49.0;
    let estimatedHeight = baseHeight;
    
    if (age <= 12) {
      // 0-12 months: faster growth
      estimatedHeight += (age * 1.5);
    } else {
      // 12+ months: slower growth
      estimatedHeight += (12 * 1.5) + ((age - 12) * 0.7);
    }
    
    return parseFloat(estimatedHeight.toFixed(1));
  }
  
  // Get ideal weight based on age and gender
  getIdealWeight(age, gender) {
    if (age <= 12) {
      // For babies: starting weight around 3.5kg, gaining approximately 0.5kg per month in first year
      const baseWeight = gender === "Laki-laki" ? 3.5 : 3.3;
      return parseFloat((baseWeight + (age * 0.5)).toFixed(1));
    } else {
      // Simple formula for toddlers after 1 year
      // Approximately follows: weight (kg) = 8 + (age in years * 2) with age adjusted to years
      const ageInYears = age / 12;
      const weightEstimate = 8 + (ageInYears * 2);
      return parseFloat(weightEstimate.toFixed(1));
    }
  }
}

// Initialize StuntingAI when the page loads
let stuntingAI;
document.addEventListener('DOMContentLoaded', function() {
  stuntingAI = new StuntingAI();
});
