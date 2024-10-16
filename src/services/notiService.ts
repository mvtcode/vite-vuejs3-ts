import {TYPE_ERROR, TYPE_INFO, TYPE_SUCCESS, TYPE_WARRING} from "@/constants";
// import { trans } from "~/utils/language.js";
export function setNotifySuccess(message) {
  ElNotification({
    title: "Success",
    message: message,
    type: TYPE_SUCCESS,
  });
}

export function setNotifyError(message) {
  ElNotification({
    title: "Error",
    message: message,
    type: TYPE_ERROR,
  });
}

export function setNotifyInfo(message) {
  ElNotification({
    title: "Info",
    message: message,
    type: TYPE_INFO,
  });
}

export function setNotifyWarning(message) {
  ElNotification({
    title: "Warning",
    message: message,
    type: TYPE_WARRING,
  });
}
