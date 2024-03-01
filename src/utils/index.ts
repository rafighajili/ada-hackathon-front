import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function objectToFormData(obj: any, formData?: FormData, namespace?: string): FormData {
  const fd = formData || new FormData();
  let formKey: string;

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      if (typeof obj[property] === "object" && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        if (obj[property]) {
          fd.append(formKey, obj[property]);
        }
      }
    }
  }

  return fd;
}
