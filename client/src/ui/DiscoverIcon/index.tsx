import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const DiscoverIcon = ({
  width = "65",
  height = "11",
  viewBox = "0 0 32.267 5.431",
  sx = { width: "65px", height: "11px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      <path d="M0 .09h1.404c1.573 0 2.962.54 2.962 2.617 0 2.078-1.389 2.618-2.962 2.618H0V.09z" />
      <path
        d="M1.029 4.5h.573c.86 0 1.69-.653 1.69-1.793S2.462.915 1.602.915h-.573V4.5z"
        fill="#fff"
      />
      <path d="M4.777.09h1.029v5.235H4.777zM9.123 1.472c-.354-.221-.735-.455-1.138-.506-.369-.047-.762.064-.762.587 0 .908 2.249.525 2.249 2.28 0 1.147-.896 1.698-1.926 1.583-.558-.063-.881-.232-1.326-.532V3.822c.353.195.87.556 1.268.628.437.078.911-.062.911-.535 0-.998-2.249-.585-2.249-2.317C6.15.428 7.04 0 7.943 0c.441 0 .836.169 1.18.469v1.003zM16.501 0c1.61 0 2.654 1.11 2.654 2.693 0 1.582-1.03 2.723-2.654 2.723-1.646 0-2.701-1.118-2.701-2.723C13.8 1.087 14.87 0 16.501 0zM18.808.09h1.102l1.143 2.766L22.12.09h1.068l-2.009 5.235h-.373zM23.456.09h3.028v.825h-1.999v1.29h1.83v.825h-1.83V4.5h2.014v.825h-3.043zM26.773.09h1.11c1.103 0 2.418-.038 2.418 1.417 0 .615-.404 1.125-1.059 1.215v.015c.279.022.441.308.544.54l.823 2.047h-1.146l-.617-1.634c-.147-.39-.279-.54-.713-.54h-.331v2.175h-1.029V.09z" />
      <path
        d="M27.802 2.325h.338c.507 0 1.088-.075 1.088-.728 0-.63-.573-.683-1.088-.683h-.338v1.411z"
        fill="#fff"
      />
      <path d="M13.54 4.802c-.25.324-.874.523-1.295.553-1.595.112-2.667-.783-2.667-2.553 0-1.792.934-2.831 2.674-2.75.338.016.891.13 1.265.436v1.01c-.436-.272-.888-.465-1.271-.481-1.058-.043-1.595.638-1.595 1.71 0 1.065.501 1.664 1.596 1.623.42-.016 1.065-.361 1.292-.551v1.003z" />
      <circle cx="31.816" cy=".52" r=".451" />
      <path
        d="M32.157.52c0-.211-.152-.364-.341-.364-.189 0-.341.152-.341.364 0 .211.152.363.341.363.188 0 .341-.153.341-.363z"
        fill="#fff"
      />
      <path d="M31.642.262h.19c.123 0 .188.042.188.15 0 .087-.05.13-.133.137l.137.224h-.097l-.133-.22h-.058v.22h-.095V.262z" />
      <path
        d="M31.737.481h.084c.056 0 .105-.008.105-.076 0-.061-.055-.07-.104-.07h-.085v.146z"
        fill="#fff"
      />
    </SvgIcon>
  );
};

export default DiscoverIcon;
