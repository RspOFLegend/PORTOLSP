// ================================================
// J.620100.004.02 - Menggunakan Struktur Data
// Array of Objects untuk proyek dan inventory
// localStorage untuk data permanen
// ================================================

// --- DATA PROYEK PORTFOLIO ---
let dataProyek  = [];
let filterProyekAktif = "All";

// --- DATA INVENTORY ---
let dataInventory = [];
let filterInvAktif = "Semwua";

// ================================================
// J.620100.025.02 - Debugging & Keamanan Login
// Kredensial admin disimpan sebagai konstanta
// Username dan password dicek saat form login di-submit
// ================================================
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

// Data awal proyek portfolio
const proyekAwal = [
    { id: 1, nama: "Flower Blossom Wedding Website",  gambar: "https://i.ibb.co/tSP93nr/m-daffa-project-1.png",    kategori: "Web",    deskripsi: "Mengerjakan web sekolah" },
    { id: 2, nama: "Garden Bloom Wedding Website",     gambar: "https://i.ibb.co/HpMzR0jL/m-daffa-project-2.png", kategori: "Mobile", deskripsi: "Proyek mobile apps" },
    { id: 3, nama: "IoT Running Text Arduino Esp8266",   gambar: "https://i.ibb.co/KjBRQq8s/m-daffa-project-3.png",    kategori: "IoT",    deskripsi: "Pengenalan IoT" },
];

// Data awal inventory lab
const inventoryAwal = [
    { id: 1, nama: "PC Acer Aspire",  foto: "https://picsum.photos/seed/pc1/300/200",     kategori: "PC",         status: "Baik"  },
    { id: 2, nama: "Laptop Lenovo",   foto: "https://picsum.photos/seed/laptop1/300/200", kategori: "Laptop",     status: "Baik"  },
    { id: 3, nama: "Router Mikrotik", foto: "https://picsum.photos/seed/router1/300/200", kategori: "Networking", status: "Rusak" },
    { id: 4, nama: "Switch TP-Link",  foto: "https://picsum.photos/seed/switch1/300/200", kategori: "Networking", status: "Baik"  },
];

// ================================================
// J.620100.010.01 - Menerapkan Perintah Eksekusi
// Load data saat halaman pertama dibuka
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    // Load data proyek
    const simpanProyek = localStorage.getItem("porto_proyek");
    dataProyek = simpanProyek ? JSON.parse(simpanProyek) : proyekAwal;
    if (!simpanProyek) localStorage.setItem("porto_proyek", JSON.stringify(proyekAwal));

    // Load data inventory
    const simpanInv = localStorage.getItem("lab_inventory");
    dataInventory = simpanInv ? JSON.parse(simpanInv) : inventoryAwal;
    if (!simpanInv) localStorage.setItem("lab_inventory", JSON.stringify(inventoryAwal));

    tampilkanProyek(dataProyek);
    tampilkanInventory(dataInventory);
});

// ================================================
// Event Listener Form Login
// Cek username & password saat form login di-submit
// ================================================
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    // Validasi kredensial login
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        // Login berhasil
        document.getElementById("loginOverlay").style.display   = "none";
        document.getElementById("adminDashboard").style.display = "block";
        document.getElementById("loginForm").reset();
        document.getElementById("loginError").style.display     = "none";
        document.getElementById("adminDashboard").scrollIntoView({ behavior: "smooth" });
    } else {
        // Login gagal - tampilkan pesan error
        document.getElementById("loginError").style.display = "block";
    }
});

// ================================================
// J.620100.010.01 - Event Listener Form Inventory
// Tambah perangkat baru saat form admin di-submit
// ================================================
document.getElementById("inventoryForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("itemName").value.trim();
    const foto = document.getElementById("itemImg").value.trim();

    // Validasi input
    if (!nama || !foto) {
        tampilAlert("Nama dan URL foto wajib diisi!", "error");
        return;
    }
    if (!foto.startsWith("https://")) {
        tampilAlert("URL foto harus diawali https://", "error");
        return;
    }

    // Buat objek baru dan push ke array
    const itemBaru = {
        id       : Date.now(),
        nama     : nama,
        foto     : foto,
        kategori : document.getElementById("itemCat").value,
        status   : document.getElementById("itemStatus").value,
    };

    dataInventory.push(itemBaru);
    localStorage.setItem("lab_inventory", JSON.stringify(dataInventory));

    tampilAlert("Perangkat berhasil ditambahkan!", "sukses");
    document.getElementById("inventoryForm").reset();
    filterInventory(filterInvAktif);
});

// ================================================
// Implementasi Looping (forEach)
// Render kartu proyek portfolio
// ================================================
function tampilkanProyek(dataArr) {
    const list = document.getElementById("proyekList");
    list.innerHTML = "";

    if (dataArr.length === 0) {
        list.innerHTML = `<p class="kosong">Belum ada proyek.</p>`;
        return;
    }

    dataArr.forEach((proyek) => {
        list.innerHTML += `
            <div class="card">
                <img src="${proyek.gambar}" alt="${proyek.nama}"
                     onerror="this.src='https://via.placeholder.com/400x250?text=Tidak+Ada'">
                <div class="card-body">
                    <p class="card-kat">${proyek.kategori}</p>
                    <h3>${proyek.nama}</h3>
                    <p>${proyek.deskripsi}</p>
                    <button class="btn-hapus" onclick="hapusProyek(${proyek.id})">Hapus Proyek</button>
                </div>
            </div>
        `;
    });
}

// ================================================
// Implementasi Looping (forEach)
// Render kartu inventory lab
// ================================================
function tampilkanInventory(dataArr) {
    const list = document.getElementById("inventoryList");
    list.innerHTML = "";

    if (dataArr.length === 0) {
        list.innerHTML = `<p class="kosong">Tidak ada perangkat.</p>`;
        return;
    }

    dataArr.forEach((item) => {
        const badgeClass = item.status === "Baik" ? "baik"
                         : item.status === "Repair" ? "repair"
                         : "rusak";
        list.innerHTML += `
            <div class="card">
                <img src="${item.foto}" alt="${item.nama}"
                     onerror="this.src='https://via.placeholder.com/300x200?text=Tidak+Ada'">
                <div class="card-body">
                    <p class="card-kat">${item.kategori}</p>
                    <h3>${item.nama}</h3>
                    <span class="badge ${badgeClass}">${item.status}</span><br>
                    <button class="btn-hapus" onclick="hapusInventory(${item.id})">Hapus</button>
                </div>
            </div>
        `;
    });
}

// ================================================
// Filter Logic (Array.filter)
// Filter proyek portfolio berdasarkan kategori
// ================================================
function filterProyek(kategori) {
    filterProyekAktif = kategori;
    document.querySelectorAll("#portofolio .filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.kat === kategori);
    });
    const hasil = kategori === "All"
        ? dataProyek
        : dataProyek.filter(p => p.kategori === kategori);
    tampilkanProyek(hasil);
}

// ================================================
// J.620100.017.02 - Filter Logic (Array.filter)
// Filter inventory berdasarkan kategori
// ================================================
function filterInventory(kategori) {
    filterInvAktif = kategori;
    document.querySelectorAll("#inventory .filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.inv === kategori);
    });
    const hasil = kategori === "Semua"
        ? dataInventory
        : dataInventory.filter(i => i.kategori === kategori);
    tampilkanInventory(hasil);
}

// ================================================
// J.620100.017.02 - Hapus inventory
// Buat array baru tanpa item yang dihapus
// ================================================
function hapusInventory(id) {
    if (!confirm("Yakin ingin menghapus perangkat ini?")) return;
    dataInventory = dataInventory.filter(item => item.id !== id);
    localStorage.setItem("lab_inventory", JSON.stringify(dataInventory));
    tampilAlert("Perangkat berhasil dihapus.", "sukses");
    filterInventory(filterInvAktif);
}

// ================================================
// J.620100.017.02 - Hapus Proyek
// Buat array baru tanpa item yang dihapus
// ================================================

function hapusProyek(id) {
    if (!confirm("Yakin ingin menghapus proyek ini?")) return;
    dataProyek = dataProyek.filter(p => p.id !== id);
    localStorage.setItem("porto_proyek", JSON.stringify(dataProyek));
    tampilAlert("Proyek berhasil dihapus.", "sukses");
    filterProyek(filterProyekAktif);
}

// ================================================
// Fungsi buka/tutup login & logout
// ================================================
function bukaAdmin() {
    // Kalau admin sudah login, langsung scroll ke dashboard
    if (document.getElementById("adminDashboard").style.display === "block") {
        document.getElementById("adminDashboard").scrollIntoView({ behavior: "smooth" });
    } else {
        document.getElementById("loginOverlay").style.display = "flex";
    }
}

function tutupLogin() {
    document.getElementById("loginOverlay").style.display = "none";
    document.getElementById("loginForm").reset();
    document.getElementById("loginError").style.display = "none";
}

function logout() {
    document.getElementById("adminDashboard").style.display = "none";
    tampilAlert("Berhasil logout.", "sukses");
}

// ================================================
// J.620100.016.01 - Menulis Kode Bersih
// Helper: tampilkan pesan sukses/error 3 detik
// ================================================
function tampilAlert(pesan, tipe) {
    const box = document.getElementById("alertBox");
    box.textContent   = pesan;
    box.className     = `alert ${tipe}`;
    box.style.display = "block";
    setTimeout(() => { box.style.display = "none"; }, 3000);
}
