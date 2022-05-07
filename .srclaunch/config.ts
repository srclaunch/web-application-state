import {
  BrowserPackage,
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  CodeFormatterTool,
  CodeLinterTool,
  License,
  Project,
  ProjectType,
  PublishAccess,
  StaticTypingTool,
  TestReporter,
  TestTool,
  UniversalPackage,
} from '@srclaunch/types';

const config: Project = {
  name: '@srclaunch/web-application-state',
  description: 'Redux state and utilities used by AppLab web applications',
  type: ProjectType.Library,
  build: {
    bundle: {
      exclude: ['react', 'react-dom', 'styled-components'],
      globals: {
        react: 'React',
      },
    },
    input: {
      directory: 'src',
      file: 'index.tsx',
    },
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Browser,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  environments: {
    development: {
      formatters: [CodeFormatterTool.Prettier],
      linters: [CodeLinterTool.ESLint],
      staticTyping: [StaticTypingTool.TypeScript],
    },
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Jest,
  },
  release: {
    publish: {
      access: PublishAccess.Public,
      license: License.MIT,
      registry: 'https://registry.npmjs.org/',
    },
  },
  requirements: {
    node: '>=16',
    yarn: '>=3.2.0',
    packages: [
      BrowserPackage.AmazonCognitoIdentityJS,
      BrowserPackage.History,
      BrowserPackage.SrcLaunchThemes,
      BrowserPackage.SrcLaunchWebEnvironment,
      BrowserPackage.ReactRedux,
      BrowserPackage.ReactRouter,
      UniversalPackage.Redux,
      UniversalPackage.ReduxToolkit,
      UniversalPackage.CryptoJS,
      UniversalPackage.Luxon,
      UniversalPackage.NanoID,
      UniversalPackage.SrcLaunchExceptions,
      UniversalPackage.SrcLaunchHttpClient,
      UniversalPackage.SrcLaunchI18n,
      UniversalPackage.SrcLaunchLogger,
      UniversalPackage.SrcLaunchValidation,
    ],
    peerPackages: [
      BrowserPackage.React,
      BrowserPackage.ReactDOM,
      BrowserPackage.StyledComponents,
    ],
    srclaunch: {
      dx: true,
      cli: true,
      types: true,
    },
  },
};

export default config;
