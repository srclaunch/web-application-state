import {
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  ProjectType,
  TestReporter,
  TestTool,
} from '@srclaunch/types';

export default {
  name: '@srclaunch/web-application-state',
  description: 'Redux state and utilities used by AppLab web applications',
  type: ProjectType.Library,
  build: {
    external: [
      'chalk',
      '@srclaunch/logger',
      '@reduxjs/toolkit',
      'react',
      'react-dom',
      'react-redux',
    ],
    input: {
      directory: 'src',
      file: 'index.tsx',
    },
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Browser,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Jest,
    verbose: true,
  },
};
