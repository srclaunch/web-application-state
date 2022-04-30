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
    bundle: {
      external: ['react', 'react-dom'],
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
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Jest,
  },
};
