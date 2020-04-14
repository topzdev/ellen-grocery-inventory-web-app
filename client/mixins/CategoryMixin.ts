import { Component, Vue } from "vue-property-decorator";
import {
  categoryStore,
  frontendStore,
  processStore,
  ICategoryModule,
  IFrontendModule,
  IProcessModule
} from "~/store";
import ICategory from "~/interfaces/ICategory";

@Component
class CategoryMixin extends Vue {
  redirect: boolean = false;
  dialog: boolean = true;
  isEdit: boolean = false;
  active: number = -1;
  categoryStore: ICategoryModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;
  $refs!: { form: any }
  category: ICategory = {
    category_id: undefined,
    category_name: "",
    description: null
  };

  constructor() {
    super();
    this.categoryStore = categoryStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addCategory() {
    this.categoryStore.addCategory({ category: this.category, redirect: this.redirect });
  }

  updateCategory() {
    this.isEdit = false;
    this.categoryStore.updateCategory(this.category);
  }

  showDelete(item: ICategory) {
    this.category = item;
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.category.category_name,
      title: "Category"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.categoryStore.deleteCategory,
      id: this.category.category_id
    });
  }

  setCategory(item: ICategory) {
    if (!item) {
      this.clearFields()
      return this.isEdit = false
    };

    this.isEdit = true;
    this.category = JSON.parse(JSON.stringify(item));
  }

  searchCategory(search: string) {
    this.categoryStore.fetchCategories({ search })
  }

  clearFields() {
    this.category.category_id = undefined;
    this.category.category_name = "";
    this.category.description = "";
    this.$refs.form.resetForm();
  }

  validate() {
    if (this.$refs.form.validateForm()) {
      if (this.isEdit) {
        this.updateCategory();
      } else {
        this.addCategory();
      }
    }
  }

  get isLoading() {
    if (this.categoryStore.getLoading) {
      this.clearFields();
      this.frontendStore.setCategoryModal(false);
    }
    return this.categoryStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.categoryModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setCategoryModal(show);
  }

  closeModal() {
    this.clearFields();
    this.frontendStore.setCategoryModal(false);
  }

  get categoryList() {
    return this.categoryStore.getCategories;
  }

  get categoryTitle() {
    return this.isEdit ? "Update Category" : "Add Category";
  }

  rules: Object = {
    category_name: [(v: any) => !!v || "Category Name is required"]
  };
}

export default CategoryMixin;
