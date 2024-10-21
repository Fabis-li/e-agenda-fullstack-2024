import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UsuarioService } from "./services/usuario.service";
import { LocalStorageService } from "./services/local-storage.service";

export const provideAuthentication = () : EnvironmentProviders => {
    return makeEnvironmentProviders([AuthService, UsuarioService, LocalStorageService]);
};
