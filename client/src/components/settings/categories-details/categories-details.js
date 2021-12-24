import { useEffect, useState } from "react";
import { CategoriesTable } from "./categories-table";

export function CategoriesDetails() {

    const [categories, setCategories] = useState([]);
    const [headers] = useState([
        {
            Header: "ID",
            accessor: "category_id",
        },
        {
            Header: "Category Name",
            accessor: "category_name",
        },
    ]);

    const getCategories = async () => {
        const cat = await fetch('/heroes/getCategories');
        const res = await cat.json()
        setCategories(res);
    }

    useEffect(() => {
        getCategories();
    }, [])

    if (categories && categories.length > 0) {
        return (
            <div>
                <h2>Gun Categories</h2>
                <CategoriesTable columns={headers} data={categories} />
            </div>
        );
    } else {
        return <div></div>
    }
}