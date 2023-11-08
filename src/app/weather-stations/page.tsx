"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useAddMyStationsMutation } from "@/redux/services/stationApi";
import { FormInputText } from "@/components/NumberInput/NumberInput";
import { StationTable } from "@/components/StationTable/StationTable";
import {
  latValidator,
  lonValidator,
  numberValidator,
} from "@/components/NumberInput/utils";
import styles from "./weatherPage.module.css";
import "@/app/globals.css";

interface IFormInput {
  latitude: string;
  longitude: string;
  altitude: string;
  name: string;
}
const initialValue = {
  latitude: "",
  longitude: "",
  altitude: "",
  name: "",
};
export default function Page() {
  const [formExpanded, setFormExpanded] = useState<boolean>(false);
  const [addStation, { isLoading }] = useAddMyStationsMutation();
  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: initialValue,
  });
  const handleFormSubmit = (data: IFormInput) => {
    setFormExpanded(false);
    addStation({
      name: data.name,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      altitude: Number(data.altitude),
      external_id: data.name,
    }).unwrap();
    reset();
  };
  return (
    <Box>
      {formExpanded && (
        <Box>
          <form
            className={styles.stationForm}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  className={styles.name_input}
                  size="small"
                  variant="outlined"
                  name="name"
                  label="Name"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormInputText
              className={styles.numberInput}
              control={control}
              name={"latitude"}
              label="Latitude"
              validate={latValidator}
            />
            <FormInputText
              className={styles.numberInput}
              control={control}
              name={"longitude"}
              label="Longitude"
              validate={lonValidator}
            />
            <FormInputText
              className={styles.numberInput}
              control={control}
              name={"altitude"}
              label="Altitude"
              validate={numberValidator}
            />
            <Button
              className={styles.saveButton}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Box>
      )}
      <Box mb={2}>
        <Button variant="contained" onClick={() => setFormExpanded(true)}>
          + Add new Station
        </Button>
      </Box>
      <StationTable addFetching={isLoading} />
    </Box>
  );
}
