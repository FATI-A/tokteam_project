import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { DatePickerInput, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select period",
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
});

export default function InputDate(props) {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const onDateChange = (newDate) => {
    setShowDatePicker(false);
    props.setInputDate(newDate);
  };
  const showDatePickerModal = () => {
    setShowDatePicker(!showDatePicker);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  return (
    <SafeAreaProvider>
      <View style={styles.position}>
        <TouchableWithoutFeedback onPress={showDatePickerModal}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Date"
              value={formatDate(props.inputDate)}
              editable={false}
              style={{ flex: 1, color: "black" }}
            />
          </View>
        </TouchableWithoutFeedback>

        {showDatePicker && (
          <DatePickerInput
            locale="en"
            value={props.inputDate}
            onChange={onDateChange}
            inputMode="start"
            mode="outlined"
            theme={{ roundness: 10 }}
            selectionColor="#2667FF"
            activeOutlineColor="#2667FF"
            style={styles.input}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    Width: "50%",
    marginTop: 20,
    color: "white",
  },
  position: {
    flex: 1,
    alignItems: "center",
    width: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
