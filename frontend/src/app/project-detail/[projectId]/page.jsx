"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import axios from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import ProjectBanner from "./_components/ProjectBanner";
import ProjectInfo from "./_components/ProjectInfo";
import { usePathname } from "next/navigation";

function ProjectDetail({ params }) {
  const path = usePathname();
  const [productList, setProductList] = useState();
  const [isLoading, setLoadin] = useState(true);
  const  getProductId = async () => {
    let id = params.projectId;
    let url = "productShowId.php?id=" + id;
    try {
      const data = await axios.get(url).then((res) => {
        console.log(res.data.status)
        if (res.data.status === "success") {
          setProductList(res.data.data);
          setLoadin(false);
        } else {
          setProductList(res.data);
          setLoadin(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductId();
  }, []);

  return (
    <div className="py-8 px-10 md:px-28">
        <Breadcrumb path={path} />
        <div className="flex flex-col mt-10 sm:flex-row gap-5 sm:gap-10">
            <ProjectBanner productDetail={productList} />
            <ProjectInfo productDetail={productList} />
        </div>
    </div>
  );
}

export default ProjectDetail;
