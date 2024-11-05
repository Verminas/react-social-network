import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUploadFile } from "common/hooks/useUploadFile";

export const UploadFile = () => {
  const { onUploadBtn, uploadHandler, inputRef, isLoading } = useUploadFile();

  return (
    <label>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={uploadHandler}
        ref={inputRef}
      />
      <Button
        type="primary"
        icon={<UploadOutlined />}
        iconPosition={"end"}
        onClick={onUploadBtn}
        loading={isLoading}
      >
        Update Photo
      </Button>
    </label>
  );
};
