import fs from 'fs'
import path from 'path'

const fixRouteTypes = () => {
  const typeFile = path.join('.next', 'types', 'app', 'api', 'transactions', '[id]', 'route.ts');
  if (fs.existsSync(typeFile)) {
    let content = fs.readFileSync(typeFile, 'utf8');
    content = content.replace(
      /type RouteContext = { params: Promise<SegmentParams> }/,
      'type RouteContext = { params: SegmentParams }'
    );
    fs.writeFileSync(typeFile, content);
  }
};

// Run immediately
fixRouteTypes();

// Export for potential CI/CD usage
export { fixRouteTypes };