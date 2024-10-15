// Mendapatkan elemen-elemen DOM
const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;
const itemsPerPage = 7; // Jumlah item per halaman
let allData = [];
let filteredData = [];

// Fungsi untuk menampilkan hasil pencarian dengan pagination
function displayResults(data) {
  resultsList.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedResults = data.slice(start, end);

  if (paginatedResults.length === 0) {
    resultsList.innerHTML = "<li>Tidak ada hasil ditemukan.</li>";
  } else {
    paginatedResults.forEach((item, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.link; // Menggunakan link dari data CSV
      link.textContent = `${item.title}`;
      link.target = "_blank"; // Membuka tautan di tab baru

      // Menambahkan kelas animasi khusus untuk "Hinatazaka46" dan "Hiragana"
      if (
        item.artist === "Hinatazaka46" ||
        item.artist === "Hiragana Keyakizaka46"
      ) {
        link.classList.add("shining-text");
      } else if (
        item.artist === "Hinatazaka46" ||
        (item.artist === "Hiragana Keyakizaka46") & (data.indexOf(item) === 0)
      ) {
        link.classList.add("shining-text");
      } else if (data.indexOf(item) === 0) {
        link.classList.add("new-text");
      }

      li.appendChild(link);
      resultsList.appendChild(li);
    });
  }

  // Mengatur status tombol "Sebelumnya" dan "Selanjutnya"
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = end >= data.length;
}

// Fungsi untuk melakukan pencarian
function search(data) {
  const query = searchInput.value.toLowerCase();
  filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(query)
  );
  currentPage = 1; // Reset ke halaman pertama
  displayResults(filteredData);
}

// Fungsi untuk memuat data dari file JSON di folder 'data'
function loadData() {
  fetch("data/data.json") // Mengambil data dari file JSON di folder 'data'
    .then((response) => response.json())
    .then((data) => {
      allData = data; //.reverse(); // Membalikkan urutan data jika diperlukan
      search(allData); // Menampilkan data awal saat halaman dimuat
      searchInput.addEventListener("input", () => search(allData)); // Menambahkan event listener untuk pencarian
    })
    .catch((error) => console.error("Error loading data:", error));
}

// Menangani klik pada tombol "Sebelumnya"
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayResults(filteredData);
  }
});

// Menangani klik pada tombol "Selanjutnya"
nextButton.addEventListener("click", () => {
  currentPage++;
  displayResults(filteredData);
});

// Memuat data saat halaman dimuat
loadData();
