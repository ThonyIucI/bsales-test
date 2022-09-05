const url = 'http://localhost:3001/api',
  filters = {},
  products = document.getElementById('products'),
  cardProduct = document.getElementById('template-card').content,
  fragmentCard = document.createDocumentFragment(),
  categories = document.getElementById('categories'),
  category = document.getElementById('template-category').content,
  fragmentCategory = document.createDocumentFragment();
const buttonSearch = document.getElementById('buttonSearch'),
  inputSearch = document.getElementById('inputSearch');
//   formCheckInput = document.getElementsByClassName('checkbox');
document.addEventListener('DOMContentLoaded', async () => {
  addProduct(await getProducts());
  addCategory(await getCategories());
});

const getProducts = async () => {
  try {
    const res = await fetch(`${url}/products`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    const data = await res.json();
    console.log(filters);
    console.log(data.length);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getCategories = async () => {
  try {
    const res = await fetch(`${url}/categories`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = (data) => {
  data?.forEach((p) => {
    cardProduct
      .querySelector('img')
      .setAttribute(
        'src',
        p.url_image
          ? p.url_image
          : 'https://bitzen.cl/49-medium_default/bsale.jpg'
      );
    cardProduct.querySelector('span').textContent = p.discount
      ? `${p.discount}% off`
      : '';
    cardProduct.querySelector('h6').textContent = p.name;
    cardProduct.querySelector('p').textContent = p.discount
      ? `$${p.price} now: $${(p.price * (100 - p.discount)) / 100}`
      : `$${p.price}`;

    const clone = cardProduct.cloneNode(true);
    fragmentCard.appendChild(clone);
  });
  products.appendChild(fragmentCard);
};
const addCategory = (data) => {
  data.map((p) => {
    category.querySelector('p').textContent = p.name;
    category.querySelector('input').setAttribute('id', `cat${p.id}`);

    const clone = category.cloneNode(true);
    fragmentCategory.appendChild(clone);
  });
  categories.appendChild(fragmentCategory);
};
// Filters
buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  filters.name = inputSearch.value;
  updateCards();
});
categories.addEventListener('click', (e) => {
  if (!filters.category) filters.category = [];
  if (e.target.classList.contains('checkbox')) {
    document
      .getElementById(e.target.id)
      .setAttribute('value', e.target.value == 0 ? 1 : 0);
    if (e.target.value == 1) addCategoryToFilters(e.target.id[3]);
    if (e.target.value == 0) removeCategoryToFilters(e.target.id[3]);
  }
});
const searchByName = async (e) => {
  //   addProduct(await getProducts());
};

const updateCards = async () => {
  console.log(filters);
  products.innerHTML = '';
  addProduct(await getProducts());
};
const addCategoryToFilters = (id) => {
  if (!filters.category?.includes(id)) filters.category.push(id);
};
const removeCategoryToFilters = (id) => {
  filters.category = filters.category?.filter((e) => e !== id);
};
