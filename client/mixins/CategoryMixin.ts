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
  valid: boolean = false;
  dialog: boolean = true;
  isEdit: boolean = false;
  active: number = -1;
  categoryStore: ICategoryModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;

  public category: ICategory = {
    category_name: "",
    category_id: undefined,
    description: null
  };

  constructor() {
    super();
    this.categoryStore = categoryStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addCategory() {
    this.categoryStore.addCategory(this.category);
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
    this.isEdit = true;
    this.category = JSON.parse(JSON.stringify(item));
  }

  setCancel() {
    this.isEdit = false;
    this.category = {
      category_name: "",
      category_id: undefined,
      description: null
    };
    // @ts-ignore
    this.$refs.manageForm.resetValidation();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      if (this.isEdit) {
        this.updateCategory();
      } else {
        this.addCategory();
      }
    }
  }

  get categoryList() {
    return this.categoryStore.getCategories;
  }

  get categoryTitle() {
    return this.isEdit ? "Edit Category" : "Add Category";
  }

  rules: Object = {
    category_name: [(v: any) => !!v || "Category Name is required"],
    description: [
      (v: any) =>
        (v != null && v.length <= 300) ||
        "Description length must not exceed to 300"
    ]
  };
}

export default CategoryMixin;
