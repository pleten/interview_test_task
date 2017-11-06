const filterElements = $$('.filter-item > a');
 const sortingButton = $$('.sort-btn > a');

export default class HomePage {
  getFilters() {
    return filterElements;
  }

  getSorting() {
    return sortingButton;
  }
}