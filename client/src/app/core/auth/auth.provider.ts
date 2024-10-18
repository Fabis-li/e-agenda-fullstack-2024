import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";

export const provideAuthentication = () : EnvironmentProviders => {
    return makeEnvironmentProviders([]);
};
