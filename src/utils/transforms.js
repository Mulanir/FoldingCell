import transformUtil from "src/utils/matrices";

export default function transform(ref, dx, y) {
  const matrix = transformUtil.createIdentityMatrix();

  const rotate = transformUtil.rotateX(dx);

  transformUtil.origin(rotate, { x: 0, y, z: 0 });
  transformUtil.applyPerspective(matrix, 1500);
  transformUtil.multiplyInto(matrix, matrix, rotate);

  ref.current.setNativeProps({
    style: {
      transform: [
        {
          matrix,
        },
      ],
    },
  });
}
