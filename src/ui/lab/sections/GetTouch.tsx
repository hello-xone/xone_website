import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { submitContactForm } from "@/api/common";
import { checkEmail } from "@/utils/check";

interface FormValues {
  name: string;
  email: string;
  project: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
}

export default function GetTouch() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表单验证函数
  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    // 姓名验证
    if (!values.name) {
      errors.name = t("lab:getTouchFormNameRequired");
    } else if (values.name.length < 2) {
      errors.name = t("lab:getTouchFormNameMin");
    } else if (values.name.length > 50) {
      errors.name = t("lab:getTouchFormNameMax");
    }

    // 邮箱验证
    if (!values.email) {
      errors.email = t("lab:getTouchFormEmailRequired");
    } else if (!checkEmail(values.email)) {
      errors.email = t("lab:getTouchFormEmailInvalid");
    }

    // 项目/公司名称验证
    if (!values.project) {
      errors.project = t("lab:getTouchFormProjectRequired");
    } else if (values.project.length < 2) {
      errors.project = t("lab:getTouchFormProjectMin");
    } else if (values.project.length > 100) {
      errors.project = t("lab:getTouchFormProjectMax");
    }

    // 信息验证
    if (!values.message) {
      errors.message = t("lab:getTouchFormMessageRequired");
    } else if (values.message.length < 10) {
      errors.message = t("lab:getTouchFormMessageMin");
    } else if (values.message.length > 1000) {
      errors.message = t("lab:getTouchFormMessageMax");
    }

    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      project: "",
      message: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        // 调用 API 提交表单
        await submitContactForm({
          name: values.name,
          email: values.email,
          company_name: values.project,
          content: values.message,
        });

        toast.success(t("lab:getTouchFormSuccess"));
        resetForm();
      } catch (error) {
        console.error("提交表单失败:", error);
        toast.error(t("lab:getTouchFormError"));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit } = formik;

  // 处理表单提交，如果有错误则显示提示
  const handleFormSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // 触发表单校验
    const validationErrors = await formik.validateForm();

    // 如果有校验错误，显示第一个错误
    if (Object.keys(validationErrors).length > 0) {
      // 标记所有字段为已触碰，以便显示错误状态
      formik.setTouched({
        name: true,
        email: true,
        project: true,
        message: true,
      });

      // 显示第一个错误信息
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    // 如果没有错误，提交表单
    handleSubmit();
  };

  return (
    <div className="mt-[80px] md:mt-[180px] md:mb-[120px] mb-[60px] flex flex-col gap-y-[40px]">
      <h2 className="text-[24px] md:text-[48px] font-bold text-[var(--t1)] text-center">
        {t("lab:getTouchTitle")}
      </h2>
      <div className="bg-[var(--b2)] p-[24px] rounded-[16px] transition-colors duration-300">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-y-[20px]"
        >
          {/* 姓名和邮箱 - 两列布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[22px] gap-y-[22px]">
            {/* 姓名 */}
            <div className="flex flex-col gap-y-[16px]">
              <label className="text-[var(--t1)] md:text-[24px] text-[20px] font-bold">
                {t("lab:getTouchFormName")}
                <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`${t("lab:getTouchFormLabel")}：Alex`}
                className={
                  "w-full border-transparent border-solid transition-all duration-300 outline-none h-[48px] px-[12px] py-[5px] bg-[var(--b3)] border-[1px] rounded-[8px] text-[var(--t1)] text-[16px] placeholder:text-[var(--t4)] focus:border-[var(--t1)]"
                }
              />
            </div>

            {/* 邮箱 */}
            <div className="flex flex-col gap-y-[16px]">
              <label className="text-[var(--t1)] md:text-[24px] text-[20px] font-bold">
                {t("lab:getTouchFormEmail")}
                <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`${t("lab:getTouchFormLabel")}：Alex@gmail.com`}
                className={
                  "w-full border-transparent border-solid transition-all duration-300 outline-none h-[48px] px-[12px] py-[5px] bg-[var(--b3)] border-[1px] rounded-[8px] text-[var(--t1)] text-[16px] placeholder:text-[var(--t4)] focus:border-[var(--t1)]"
                }
              />
            </div>
          </div>

          {/* 项目/公司名称 */}
          <div className="flex flex-col gap-y-[16px]">
            <label className="text-[var(--t1)] md:text-[24px] text-[20px] font-bold">
              {t("lab:getTouchFormProject")}
              <span>*</span>
            </label>
            <input
              type="text"
              name="project"
              value={values.project}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={`${t("lab:getTouchFormLabel")}：Deep labs`}
              className={
                "w-full border-transparent border-solid transition-all duration-300 outline-none h-[48px] px-[12px] py-[5px] bg-[var(--b3)] border-[1px] rounded-[8px] text-[var(--t1)] text-[16px] placeholder:text-[var(--t4)] focus:border-[var(--t1)]"
              }
            />
          </div>

          {/* 信息 */}
          <div className="flex flex-col gap-y-[16px]">
            <label className="text-[var(--t1)] md:text-[24px] text-[20px] font-bold">
              {t("lab:getTouchFormMessage")}
              <span>*</span>
            </label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("lab:getTouchFormMessagePlaceholder")}
              rows={8}
              className={
                "w-full border-transparent border-solid transition-all duration-300 outline-none resize-none h-[200px] px-[16px] py-[12px] bg-[var(--b3)] border-[1px] rounded-[8px] text-[var(--t1)] text-[16px] placeholder:text-[var(--t4)] focus:border-[var(--t1)]"
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-[4px] w-fit mx-auto bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] px-[16px] py-[12px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--b10)]"
          >
            {isSubmitting
              ? t("lab:getTouchButtonSubmitting")
              : t("lab:getTouchButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
