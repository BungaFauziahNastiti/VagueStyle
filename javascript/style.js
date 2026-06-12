// ==========================================================================
// 1. FUNGSI TOMBOL BELI (OTOMATIS CHAT KE WHATSAPP)
// ==========================================================================
// Fungsi ini mendeteksi semua tombol beli yang ada di halaman web kamu
const semuaTombolBeli = document.querySelectorAll('.btn-beli');

semuaTombolBeli.forEach(tombol => {
    tombol.addEventListener('click', (event) => {
        // Mencegah halaman reload otomatis
        event.preventDefault(); 
        
        // Mengambil nama produk dan harga dari elemen terdekatnya
        const kartuProduk = tombol.closest('.produk-item, .card-produk'); // Sesuaikan dengan nama class pembungkus produkmu
        let namaProduk = "Produk VogueStyle";
        let hargaProduk = "";

        if (kartuProduk) {
            const elemenNama = kartuProduk.querySelector('h3, .nama-produk');
            const elemenHarga = kartuProduk.querySelector('.harga, .harga-produk');
            if (elemenNama) namaProduk = elemenNama.innerText;
            if (elemenHarga) hargaProduk = elemenHarga.innerText;
        }

        // Nomor WhatsApp kamu (Ganti jika nomornya berbeda)
        const nomorWA = "6282156900828"; 
        
        // Menyusun teks pesan otomatis untuk dikirim ke WhatsApp
        const pesan = `Halo VogueStyle, saya tertarik dan ingin membeli produk: *${namaProduk}* ${hargaProduk ? 'dengan harga ' + hargaProduk : ''}. Apakah produk ini masih tersedia?`;
        
        // Membuka link WhatsApp di tab baru
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
    });
});

// ==========================================================================
// 2. LOGIKA UTAMA PENCARIAN PRODUK (OTOMATIS MEMFILTER KARTU PRODUK)
// ==========================================================================
const inputCari = document.querySelector('.search-box input');
const tombolCari = document.querySelector('.search-box button');

function jalankanPencarian() {
    if (!inputCari) return;

    // Mengambil kata kunci, diubah ke huruf kecil semua agar pencarian tidak sensitif huruf besar/kecil
    let kataKunci = inputCari.value.toLowerCase().trim();
    
    // Mengambil semua kartu produk yang ada di halaman
    const semuaProduk = document.querySelectorAll('.product-card');
    let produkDitemukan = false;

    // Perulangan untuk mengecek satu per satu produk
    semuaProduk.forEach(produk => {
        // Mengambil teks judul/nama produk di dalam tag h3
        const elemenJudul = produk.querySelector('h3');
        
        if (elemenJudul) {
            let namaBaju = elemenJudul.innerText.toLowerCase();

            // Jika nama baju mengandung kata kunci yang dicari
            if (namaBaju.includes(kataKunci)) {
                produk.style.display = "flex"; // Tetap tampilkan produk (sesuai layout CSS flex/grid)
                produkDitemukan = true;
            } else {
                produk.style.display = "none"; // Sembunyikan produk yang tidak cocok
            }
        }
    });

    // Memberikan feedback jika produk sama sekali tidak ada yang cocok
    if (!produkDitemukan && kataKunci !== "") {
        alert(`Maaf, produk dengan kata kunci "${inputCari.value}" tidak ditemukan.`);
        
        // Opsional: Tampilkan kembali semua produk jika tidak ketemu agar halaman tidak kosong melongpong
        semuaProduk.forEach(produk => produk.style.display = "flex");
        inputCari.value = ""; // Kosongkan kembali kolom pencarian
    }
}

// Jalankan fungsi saat tombol ikon kaca pembesar diklik
if (tombolCari) {
    tombolCari.addEventListener('click', (e) => {
        e.preventDefault();
        jalankanPencarian();
    });
}

// Jalankan fungsi saat pengguna menekan tombol 'Enter' di keyboard ketika mengetik
if (inputCari) {
    inputCari.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            jalankanPencarian();
        }
    });
}