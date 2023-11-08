"use client";
import { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { styled } from "@mui/material/styles";
import styles from "./Header.module.css";
import Head from "next/head";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [theme.breakpoints.between(0, 425)]: {
    width: "100%",
  },
  "& .MuiToggleButtonGroup-grouped": {
    "&.MuiToggleButton-root": {
      [theme.breakpoints.between(0, 425)]: {
        width: "100%",
        padding: "8px",
      },
      width: "170px",
      textTransform: "none",
    },
    "&.Mui-selected": {
      background: "black",
      color: "white",
      "&:hover": {
        background: "black",
      },
    },
  },
}));
export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handlePageChange = (e: MouseEvent<HTMLElement>, page: string) => {
    router.push(page);
  };
  return (
    <header className={styles.header_container}>
      <Head>
        <title>Weather App</title>
        <meta property="og:title" content="Weather App" key="title" />
      </Head>
      <StyledToggleButtonGroup
        color="primary"
        value={pathname}
        exclusive
        onChange={handlePageChange}
      >
        <ToggleButton value={`/weather`}>Weather</ToggleButton>
        <ToggleButton value="/weather-stations">
          My Weather Stations
        </ToggleButton>
      </StyledToggleButtonGroup>
    </header>
  );
};
