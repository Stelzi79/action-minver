"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
const semver_1 = __importDefault(require("semver"));
const getArgs_1 = __importDefault(require("./getArgs"));
const stdout = (data) => {
    const version = data.toString().trim();
    const major = semver_1.default.major(version);
    const minor = semver_1.default.minor(version);
    const patch = semver_1.default.patch(version);
    const prerelease = (semver_1.default.prerelease(version) || []).join('.');
    core.setOutput('version', version);
    core.setOutput('major', major.toString());
    core.setOutput('minor', minor.toString());
    core.setOutput('patch', patch.toString());
    core.setOutput('prerelease', prerelease);
};
const minverPath = './minver';
const minver = `${minverPath}/minver`;
var minverVersion = '2.5.0';
if (core.getInput('minver-version')) {
    minverVersion = core.getInput('minver-version');
}
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = (0, getArgs_1.default)();
    yield (0, exec_1.exec)('dotnet', [
        'tool',
        'install',
        '--tool-path',
        minverPath,
        'minver-cli',
        '--version',
        minverVersion,
    ]);
    try {
        yield (0, exec_1.exec)(minver, args, {
            listeners: {
                debug: (data) => core.debug(data),
                stdout,
            },
        });
    }
    catch (err) {
        core.setFailed(err);
    }
});
run();
