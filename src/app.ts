import * as ng from "angular";

const appModule = ng.module("inforview", [require<string>("angular-chart")]);

// Services
import { SCBService } from "./services/scb.service";

SCBService.injectInto(appModule);

// Components
import { StatApp } from "./components/app";
import { StatChart } from "./components/stat-chart";
import { StatSimple } from "./components/stat-simple";

StatApp.injectInto(appModule);
StatSimple.injectInto(appModule);
StatChart.injectInto(appModule);
