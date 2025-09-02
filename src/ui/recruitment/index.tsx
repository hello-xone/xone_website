import i18next from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import jobPosts from "@/assets/job/jobPosts.json";

import { SearchInputSelect } from "../../components/comm/select/SearchInputSelect";
import { Banner } from "./sections/Banner";
import { List } from "./sections/List";
import { Remark } from "./sections/Remark";

// 类型定义
interface BaseOption {
  value: string;
  label: string;
}

interface GroupOption {
  group: string;
  label: string;
  options: BaseOption[];
}

export const Recruitment = () => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    return {
      list: jobPosts.jobPosts,
      totalCount: jobPosts.totalCount,
    };
  }, []);

  // 项目选项框 - 基于公司数据动态生成
  const selectProjects = useMemo(() => {
    if (!data.list || data.list.length === 0) {
      return [
        {
          value: "all",
          label: t("recruitment:selectAllProjects"),
        },
      ];
    }

    // 从数据中提取公司名称
    const companyTypes = new Set<string>();

    data.list.forEach((job: any) => {
      if (job.company) {
        companyTypes.add(job.company);
      }
    });

    const options = [
      {
        value: "all",
        label: t("recruitment:selectAllProjects"),
      },
    ];

    // 将公司名称转换为选项
    Array.from(companyTypes).forEach((company) => {
      options.push({
        value: company,
        label: company,
      });
    });

    return options;
  }, [data.list, i18next.language]);

  // 职位选项框 - 支持分组，position为主分类，subType为二级数据
  const selectPositions = useMemo((): (BaseOption | GroupOption)[] => {
    if (!data.list || data.list.length === 0) {
      return [
        {
          value: "all",
          label: t("recruitment:selectAllPositions"),
        },
      ];
    }

    // 从数据中提取职位类型和对应的子类型
    const positionGroups = new Map<string, Set<string>>();

    data.list.forEach((job: any) => {
      if (job.position) {
        if (!positionGroups.has(job.position)) {
          positionGroups.set(job.position, new Set());
        }

        // 添加子类型到对应的职位分组
        if (job.subType && Array.isArray(job.subType)) {
          job.subType.forEach((type: string) => {
            positionGroups.get(job.position)!.add(type);
          });
        }
      }
    });

    const options: (BaseOption | GroupOption)[] = [
      {
        value: "all",
        label: t("recruitment:selectAllPositions"),
      },
    ];

    // 将职位类型转换为分组选项
    Array.from(positionGroups.entries()).forEach(([position, subTypes]) => {
      options.push({
        group: position,
        label: position,
        options: Array.from(subTypes).map((subType) => ({
          value: subType,
          label: subType,
        })),
      });
    });

    return options;
  }, [data.list, i18next.language]);

  // 地点选项框 - 基于实际数据动态生成
  const selectLocations = useMemo(() => {
    if (!data.list || data.list.length === 0) {
      return [
        {
          value: "all",
          label: t("recruitment:selectAllLocations"),
        },
      ];
    }

    // 从数据中提取地点
    const locationTypes = new Set<string>();

    data.list.forEach((job: any) => {
      if (job.location && Array.isArray(job.location)) {
        locationTypes.add(job.location[0]);
      }
    });

    const options = [
      {
        value: "all",
        label: t("recruitment:selectAllLocations"),
      },
    ];

    // 将地点转换为选项
    Array.from(locationTypes).forEach((location) => {
      options.push({
        value: location,
        label: location,
      });
    });

    return options;
  }, [data.list, i18next.language]);

  // 办公地点选项框 - 基于实际数据动态生成
  const selectOffice = useMemo(() => {
    if (!data.list || data.list.length === 0) {
      return [
        {
          value: "all",
          label: t("recruitment:selectAllOffice"),
        },
      ];
    }

    // 从数据中提取工作类型
    const workTypeTypes = new Set<string>();

    data.list.forEach((job: any) => {
      if (job.workType && Array.isArray(job.workType)) {
        job.workType.forEach((type: string) => {
          workTypeTypes.add(type);
        });
      }
    });

    const options = [
      {
        value: "all",
        label: t("recruitment:selectAllOffice"),
      },
    ];

    // 将工作类型转换为选项
    Array.from(workTypeTypes).forEach((workType) => {
      options.push({
        value: workType,
        label: workType,
      });
    });

    return options;
  }, [data.list, i18next.language]);

  // 筛选状态
  const [filters, setFilters] = useState({
    project: "all",
    position: "all",
    location: "all",
    office: "all",
    search: "",
  });

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // 每页20条数据
  const [allDisplayedData, setAllDisplayedData] = useState<any[]>([]); // 存储所有已显示的数据

  // 处理选择变化
  const handleSelectChange = (type: string, value: string, option: any) => {
    // 更新筛选状态
    setFilters((prev: any) => ({
      ...prev,
      [type]: value,
    }));

    // 重置分页到第一页，清空已显示数据
    setCurrentPage(1);
    setAllDisplayedData([]);
  };

  // 处理加载更多
  const handleLoadMore = () => {
    if (paginatedData.hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 根据筛选条件过滤数据
  const filteredData = useMemo(() => {
    if (!data.list || data.list.length === 0) {
      return { list: [], totalCount: 0 };
    }

    const filteredList = data.list.filter((job: any) => {
      // 搜索关键词筛选
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase();
        const searchableFields = [
          job.title || "",
          job.company || "",
          job.position || "",
          ...(job.subType || []),
          ...(job.location || []),
          ...(job.workType || []),
        ].map((field) => String(field).toLowerCase());

        if (!searchableFields.some((field) => field.includes(searchTerm))) {
          return false;
        }
      }

      // 项目筛选（公司）
      if (filters.project !== "all" && job.company !== filters.project) {
        return false;
      }

      // 职位筛选（技术栈）
      if (filters.position !== "all") {
        if (
          !job.subType ||
          !Array.isArray(job.subType) ||
          !job.subType.includes(filters.position)
        ) {
          return false;
        }
      }

      // 地点筛选
      if (filters.location !== "all") {
        if (
          !job.location ||
          !Array.isArray(job.location) ||
          !job.location.includes(filters.location)
        ) {
          return false;
        }
      }

      // 工作类型筛选
      if (filters.office !== "all") {
        if (
          !job.workType ||
          !Array.isArray(job.workType) ||
          !job.workType.includes(filters.office)
        ) {
          return false;
        }
      }

      return true;
    });

    return {
      list: filteredList,
      totalCount: filteredList.length,
    };
  }, [data.list, filters]);

  // 分页数据 - 累加模式
  const paginatedData = useMemo(() => {
    // 计算当前页应该显示的数据
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = filteredData.list.slice(startIndex, endIndex);

    return {
      list: currentPageData, // 返回当前页的数据
      totalCount: filteredData.totalCount,
      currentPage,
      totalPages: Math.ceil(filteredData.totalCount / pageSize),
      hasMore: currentPage < Math.ceil(filteredData.totalCount / pageSize),
    };
  }, [filteredData, currentPage, pageSize]);

  // 使用 useEffect 来管理累加数据
  useEffect(() => {
    if (currentPage === 1) {
      // 第一页：直接设置数据
      setAllDisplayedData(paginatedData.list);
    } else {
      // 其他页：累加数据
      setAllDisplayedData((prev) => [...prev, ...paginatedData.list]);
    }
  }, [paginatedData.list, currentPage]);

  console.log(paginatedData);
  return (
    <>
      <Banner
        onSearch={(value) => {
          setFilters((prev) => ({ ...prev, search: value }));
        }}
        onClear={() => {
          setFilters({
            project: "all",
            position: "all",
            location: "all",
            office: "all",
            search: "",
          });
          // 重置分页到第一页，清空已显示数据
          setCurrentPage(1);
          setAllDisplayedData([]);
        }}
      />
      <div className="container">
        <div className="grid grid-cols-1 gap-12 pt-8 md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pt-16">
          <SearchInputSelect
            options={selectProjects}
            placeholder={t("recruitment:selectProject")}
            onSelect={(value, option) =>
              handleSelectChange("project", value, option)
            }
          />
          <SearchInputSelect
            options={selectPositions}
            placeholder={t("recruitment:selectPosition")}
            maxOpentions={5}
            onSelect={(value, option) =>
              handleSelectChange("position", value, option)
            }
          />
          <SearchInputSelect
            options={selectLocations}
            placeholder={t("recruitment:selectLocation")}
            onSelect={(value, option) =>
              handleSelectChange("location", value, option)
            }
          />
          <SearchInputSelect
            options={selectOffice}
            placeholder={t("recruitment:selectOffice")}
            onSelect={(value, option) =>
              handleSelectChange("office", value, option)
            }
          />
        </div>
        <List
          data={{
            list: allDisplayedData,
            totalCount: filteredData.totalCount,
            currentPage,
            totalPages: Math.ceil(filteredData.totalCount / pageSize),
            hasMore:
              currentPage < Math.ceil(filteredData.totalCount / pageSize),
          }}
          onMore={handleLoadMore}
        />
        <Remark />
      </div>
    </>
  );
};
