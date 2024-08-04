{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.pnpm
  ];
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
  ];
  idx.previews = {
    # previews = {
    #   web = {
    #     command = [
    #       "npm"
    #       "run"
    #       "dev"
    #       "--"
    #       "--port"
    #       "$PORT"
    #       "--hostname"
    #       "0.0.0.0"
    #     ];
    #     manager = "web";
    #   };
    # };
  };
}