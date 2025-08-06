import { TextField, Autocomplete } from "@mui/material";
import SendIcon from "@/assets/svg/home/send.svg?react";
import { Button } from "@/components/comm/button";
import ArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import { Link } from "@/components/comm/link";
import { useTranslation } from "react-i18next";
import { FormikProvider, useFormik } from "formik";
import { addEmail } from "@/api/common";
import { useNotifications } from "@toolpad/core/useNotifications";
import { checkEmail } from "@/utils/check";
import styles from "./index.module.less";
import { useMemo, useRef } from "react";
import { BannerWrapper } from "@/components/layout/BannerWrapper";
import { Animation } from "@/components/comm/animation";
import { AnimationType } from "@/components/comm/animation";
import { domains } from "@/constants/domains";
import { EXTERNAL_LINKS } from "@/constants/external";

export const Banner = () => {
  const { t, i18n } = useTranslation();
  const notifications = useNotifications();
  const inputRef = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => { },
  });

  const { values, getFieldProps, setFieldValue } = formik;

  const handleSubmit = async () => {
    const email = values.email;
    if (!email) return;
    if (!checkEmail(email)) {
      notifications.show("Email format is incorrect", {
        severity: "error",
        autoHideDuration: 4000,
      });
      return;
    }
    try {
      await addEmail({
        email: values.email,
      });
      setFieldValue('email', '');
      return notifications.show(t("home:subscriptionSuccessful"), {
        severity: "success",
        autoHideDuration: 4000,
      });
    } catch (err: any) {
      console.error(err);
      notifications.show(err?.message || "Fail", {
        severity: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const isValidEmail = useMemo(() => {
    return checkEmail(values.email);
  }, [values.email]);

  const generateOptions = (input: string) => {
    if (!input) return [];
    const [prefix] = input.split("@");
    return domains.map((domain) => `${prefix}${domain}`);
  };
  return (
    <BannerWrapper>
      <div className={`__homeBanner ${styles.banner}`}>
        <video
          className={`${styles.video}`}
          autoPlay
          loop
          muted
          controls={false}
          data-wf-ignore="true"
          preload="auto"
          playsInline
          webkit-playsinline
          x5-video-player-type="h5"
          x-webkit-airplay="true"
          webkit-airplay="allow"
        >
          <source src="/video/home_banner.mp4" type="video/mp4" />
        </video>
        <div className={`${styles.content}`}>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.1}>
            <h1 className={` ${styles.slogan}`}>{t("home:bannerTitle")}</h1>
          </Animation>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.2}>
            <p className={`${styles.description}`}>
              {" "}
              {t("home:bannerDescription")}
            </p>
          </Animation>
          <FormikProvider value={formik}>
            <Animation
              className={`${styles.sendEmailWrapper}`}
              animationClassName={AnimationType.SLIDE_IN_UP}
              delay={0.4}
            >
              <Autocomplete
                disablePortal
                freeSolo
                inputValue={values.email}
                className={`${styles.emailInput}`}
                options={generateOptions(values.email)}
                onChange={(_, newValue) => {
                  setFieldValue("email", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...getFieldProps("email")}
                    className={`${isValidEmail ? styles.validEmail : ""} `}
                    placeholder={t("home:enterYourEmail")}
                    label={t("home:sendEmailLabel")}
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      inputRef: inputRef,
                      endAdornment: (
                        <div className={styles.sendIcon} onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          inputRef.current?.blur();
                          handleSubmit();
                        }}>
                          <SendIcon></SendIcon>
                        </div>
                      ),
                      className: "",
                    }}
                  ></TextField>
                )}
              ></Autocomplete>

              <Button
                className={`${styles.startBuildBtn}`}
                type="gradient"
                onClick={() => window.open(EXTERNAL_LINKS.docs + "developers/ready")}
              >
                {t("home:startBuilding")}
              </Button>
            </Animation>
          </FormikProvider>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.8}>
            <Link href={EXTERNAL_LINKS.dashboard + i18n.language + "/ecology"} className={`${styles.explore}`}>
              {t("home:exploreDApps")}
              <div className={styles.arrowIcon}>
                <ArrowIcon></ArrowIcon>
              </div>
            </Link>
          </Animation>

          <Animation
            className={`${styles.smallBtns}`}
            animationClassName={AnimationType.SLIDE_IN_UP}
            delay={0.6}
          >
            <Button className={styles.btn} type="gradient" onClick={() => window.open(EXTERNAL_LINKS.docs + "developers/ready")}>
              {t("home:startBuilding")}
            </Button>
            <Button onClick={() => window.open(EXTERNAL_LINKS.dashboard + i18n.language + "/ecology")} className={styles.btn} type="blackGradient">
              {t("home:exploreDApps")}
            </Button>
          </Animation>
        </div>
      </div>
    </BannerWrapper>
  );
};
