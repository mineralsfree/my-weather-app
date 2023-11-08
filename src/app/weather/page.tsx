"use client";
import { FormEvent, MouseEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import { Mode } from "@/redux/types";
import styles from "./weatherPage.module.css";
import "@/app/globals.css";
import { WeatherTable } from "@/components/WeatherTable/WeatherTable";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [theme.breakpoints.between(0, 425)]: {
    width: "100%",
  },
  "& .MuiToggleButtonGroup-grouped": {
    "&.MuiToggleButton-root": {
      [theme.breakpoints.between(0, 425)]: {
        padding: "8px",
        width: "100%",
      },
      width: "170px",
      textTransform: "none",
    },
  },
}));
export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(
    (searchParams.get("mode") as Mode) || Mode.Current,
  );
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("q") || "",
  );
  const [q, setQ] = useState(searchParams.get("q") || "");
  const pushNewUrl = (mode: Mode, q: string) => {
    const query = new URLSearchParams({ mode, ...(q ? { q } : {}) });
    router.push(`${pathname}?${query}`);
  };
  const changeForecastMode = (e: MouseEvent<HTMLElement>, newMode: Mode) => {
    if (!newMode) {
      return;
    }
    setMode(newMode);
    pushNewUrl(newMode, q);
  };
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushNewUrl(mode, searchInput);
    setQ(searchInput);
  };
  return (
    <div className={styles.weather_page_container}>
      <Box className={styles.form_container}>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSearchSubmit}
        >
          <TextField
            className={styles.name_input}
            size="small"
            variant="outlined"
            name="search"
            placeholder="search for a city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box ml={2}>
            <Button variant="contained" type="submit">
              Find
            </Button>
          </Box>
        </form>
        <Box>
          <StyledToggleButtonGroup
            value={mode}
            exclusive
            onChange={changeForecastMode}
          >
            <ToggleButton value={Mode.Current}>Current weather</ToggleButton>
            <ToggleButton value={Mode.Forecast}>5 day forecast</ToggleButton>
          </StyledToggleButtonGroup>
        </Box>
        <Box className={styles.placeholder} />
      </Box>
      {q.length > 0 ? (
        <WeatherTable mode={mode} q={q} />
      ) : (
        <Box mt={6}>
          <Typography align={"center"} variant={"body1"}>
            Search for a city above to see the current
            <br />
            weather information
          </Typography>
        </Box>
      )}
    </div>
  );
}
