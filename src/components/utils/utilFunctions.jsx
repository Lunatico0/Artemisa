import { NavLink } from "react-router-dom";

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const handleCategoryClick = (categoria, applyFilters, setBreadcrumb, navigate, closeMenu) => {
  closeMenu();
  scrollTop();
  applyFilters({ category: categoria.categoriaId, subcategory: null, subsubcategory: null });

  setBreadcrumb([
    { name: categoria.categoriaNombre, path: `/category/${categoria.categoriaId}` }
  ]);

  navigate(`/category/${categoria.categoriaId}`);
};

export const handleSubcategoryClick = (categoria, subcategoria, applyFilters, setBreadcrumb, navigate, closeMenu) => {
  closeMenu();
  scrollTop();
  applyFilters({ category: categoria.categoriaId, subcategory: subcategoria.subcategoriaId, subsubcategory: null });

  setBreadcrumb([
    { name: categoria.categoriaNombre, path: `/category/${categoria.categoriaId}` },
    { name: subcategoria.subcategoriaNombre, path: `/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}` }
  ]);

  navigate(`/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}`);
};

export const handleSubsubcategoryClick = (categoria, subcategoria, subsubcategoria, applyFilters, setBreadcrumb, navigate, closeMenu) => {
  closeMenu();
  scrollTop();
  applyFilters({
    category: categoria.categoriaId,
    subcategory: subcategoria.subcategoriaId,
    subsubcategory: subsubcategoria.subsubcategoriaId
  });

  setBreadcrumb([
    { name: categoria.categoriaNombre, path: `/category/${categoria.categoriaId}` },
    { name: subcategoria.subcategoriaNombre, path: `/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}` },
    { name: subsubcategoria.subsubcategoriaNombre, path: `/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}/subsubcategory/${subsubcategoria.subsubcategoriaId}` }
  ]);

  navigate(`/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}/subsubcategory/${subsubcategoria.subsubcategoriaId}`);
};

export const generateBreadcrumb = (breadcrumb) => {

  return (
    <nav className="flex gap-1 text-textLight">
      {breadcrumb.map((item, index) => (
        <span key={index} className="flex items-center">
          <NavLink to={item.path} className="hover:underline no-underline text-textDark dark:text-textLight">
            {item.name}
          </NavLink>
          {index < breadcrumb.length - 1 && <span className="mx-1">{">"}</span>}
        </span>
      ))}
    </nav>
  );
};


export const getCategoryNames = (categoryId, subcategoryId, subsubcategoryId, categories) => {
  let categoryName = null;
  let subcategoryName = null;
  let subsubcategoryName = null;

  if (!categories || categories.length === 0) return { categoryName, subcategoryName, subsubcategoryName };

  // Buscar la categoría principal
  const category = categories.find((cat) => cat.categoriaId === categoryId);
  if (category) {
    categoryName = category.categoriaNombre;

    // Buscar la subcategoría si existe
    const subcategory = category.subcategorias.find((sub) => sub.subcategoriaId === subcategoryId);
    if (subcategory) {
      subcategoryName = subcategory.subcategoriaNombre;

      // Buscar la sub-subcategoría si existe
      if (subcategory.subsubcategorias) {
        const subsubcategory = subcategory.subsubcategorias.find((subsub) => subsub.subsubcategoriaId === subsubcategoryId);
        if (subsubcategory) {
          subsubcategoryName = subsubcategory.subsubcategoriaNombre;
        }
      }
    }
  }

  return { categoryName, subcategoryName, subsubcategoryName };
};
