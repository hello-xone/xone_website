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
  parentPosition?: string; // 可选的父级职位信息
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
    const usedValues = new Set<string>();

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

    // 将公司名称转换为选项，确保 value 唯一
    Array.from(companyTypes).forEach((company) => {
      let uniqueValue = company;
      let counter = 1;

      while (usedValues.has(uniqueValue)) {
        uniqueValue = `${company}_${counter}`;
        counter++;
      }

      usedValues.add(uniqueValue);

      options.push({
        value: uniqueValue,
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
    const usedValues = new Set<string>();

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

    // 将职位类型转换为分组选项，确保 value 唯一
    Array.from(positionGroups.entries()).forEach(([position, subTypes]) => {
      const groupOptions: BaseOption[] = [];

      Array.from(subTypes).forEach((subType) => {
        let uniqueValue = subType;
        let counter = 1;

        while (usedValues.has(uniqueValue)) {
          uniqueValue = `${subType}_${counter}`;
          counter++;
        }

        usedValues.add(uniqueValue);

        groupOptions.push({
          value: uniqueValue,
          label: subType,
          parentPosition: position, // 添加父级职位信息
        });
      });

      options.push({
        group: position,
        label: position,
        options: groupOptions,
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
    const usedValues = new Set<string>();

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

    // 将地点转换为选项，确保 value 唯一
    Array.from(locationTypes).forEach((location) => {
      let uniqueValue = location;
      let counter = 1;

      while (usedValues.has(uniqueValue)) {
        uniqueValue = `${location}_${counter}`;
        counter++;
      }

      usedValues.add(uniqueValue);

      options.push({
        value: uniqueValue,
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
    const usedValues = new Set<string>();

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

    // 将工作类型转换为选项，确保 value 唯一
    Array.from(workTypeTypes).forEach((workType) => {
      let uniqueValue = workType;
      let counter = 1;

      while (usedValues.has(uniqueValue)) {
        uniqueValue = `${workType}_${counter}`;
        counter++;
      }

      usedValues.add(uniqueValue);

      options.push({
        value: uniqueValue,
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

  // 创建 value 到原始值的映射表
  const valueMappings = useMemo(() => {
    const mappings = {
      project: new Map<string, string>(),
      position: new Map<string, string>(),
      location: new Map<string, string>(),
      office: new Map<string, string>(),
    };

    // 项目映射
    selectProjects.forEach((option) => {
      if (option.value !== "all") {
        mappings.project.set(option.value, option.label);
      }
    });

    // 职位映射
    selectPositions.forEach((option) => {
      if ("options" in option) {
        // GroupOption 类型
        option.options.forEach((subOption) => {
          mappings.position.set(subOption.value, subOption.label);
        });
      } else if (option.value !== "all") {
        // BaseOption 类型
        mappings.position.set(option.value, option.label);
      }
    });

    // 地点映射
    selectLocations.forEach((option) => {
      if (option.value !== "all") {
        mappings.location.set(option.value, option.label);
      }
    });

    // 办公类型映射
    selectOffice.forEach((option) => {
      if (option.value !== "all") {
        mappings.office.set(option.value, option.label);
      }
    });

    return mappings;
  }, [selectProjects, selectPositions, selectLocations, selectOffice]);

  // 创建子选项的父级映射表
  const positionParentMappings = useMemo(() => {
    const mappings = new Map<string, string>();

    selectPositions.forEach((option) => {
      if ("options" in option) {
        // GroupOption 类型
        option.options.forEach((subOption) => {
          if (subOption.parentPosition) {
            mappings.set(subOption.value, subOption.parentPosition);
          }
        });
      }
    });

    return mappings;
  }, [selectPositions]);

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

  // 处理搜索变化
  const handleSearchChange = (value: string) => {
    // 更新搜索筛选状态
    setFilters((prev: any) => ({
      ...prev,
      search: value.trim(),
    }));

    // 重置分页到第一页，清空已显示数据
    setCurrentPage(1);
    setAllDisplayedData([]);
  };

  // 处理清空所有筛选
  const handleClearAll = () => {
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
      if (filters.project !== "all") {
        const originalProjectValue =
          valueMappings.project.get(filters.project) || filters.project;
        if (job.company !== originalProjectValue) {
          return false;
        }
      }

      // 职位筛选（技术栈）
      if (filters.position !== "all") {
        const originalPositionValue =
          valueMappings.position.get(filters.position) || filters.position;

        // 检查是否是子选项
        const parentPosition = positionParentMappings.get(filters.position);

        if (parentPosition) {
          // 子选项筛选：需要同时满足父级职位和子类型条件
          if (
            job.position !== parentPosition || // 父级职位必须匹配
            !job.subType ||
            !Array.isArray(job.subType) ||
            !job.subType.includes(originalPositionValue) // 子类型必须匹配
          ) {
            return false;
          }
        } else {
          // 非子选项筛选：只检查子类型
          if (
            !job.subType ||
            !Array.isArray(job.subType) ||
            !job.subType.includes(originalPositionValue)
          ) {
            return false;
          }
        }
      }

      // 地点筛选
      if (filters.location !== "all") {
        const originalLocationValue =
          valueMappings.location.get(filters.location) || filters.location;
        if (
          !job.location ||
          !Array.isArray(job.location) ||
          !job.location.includes(originalLocationValue)
        ) {
          return false;
        }
      }

      // 工作类型筛选
      if (filters.office !== "all") {
        const originalOfficeValue =
          valueMappings.office.get(filters.office) || filters.office;
        if (
          !job.workType ||
          !Array.isArray(job.workType) ||
          !job.workType.includes(originalOfficeValue)
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
  }, [data.list, filters, valueMappings, positionParentMappings]);

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

  return (
    <>
      <Banner onSearch={handleSearchChange} onClear={handleClearAll} />
      <div className="container">
        <div className="pt-8 md:pt-16">
          <div className="w-full flex overflow-x-auto md:overflow-x-visible gap-[18px] md:gap-4">
            <div className="min-w-[180px] md:min-w-[24%]">
              <SearchInputSelect
                options={selectProjects}
                placeholder={t("recruitment:selectProject")}
                onSelect={(value, option) =>
                  handleSelectChange("project", value, option)
                }
              />
            </div>
            <div className="min-w-[180px] md:min-w-[24%]">
              <SearchInputSelect
                options={selectPositions}
                placeholder={t("recruitment:selectPosition")}
                onSelect={(value, option) =>
                  handleSelectChange("position", value, option)
                }
              />
            </div>
            <div className="min-w-[180px] md:min-w-[24%]">
              <SearchInputSelect
                options={selectLocations}
                placeholder={t("recruitment:selectLocation")}
                onSelect={(value, option) =>
                  handleSelectChange("location", value, option)
                }
              />
            </div>
            <div className="min-w-[180px] md:min-w-[24%]">
              <SearchInputSelect
                options={selectOffice}
                placeholder={t("recruitment:selectOffice")}
                onSelect={(value, option) =>
                  handleSelectChange("office", value, option)
                }
              />
            </div>
          </div>
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
