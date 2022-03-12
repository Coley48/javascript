class User {}

export function func() {
    console.log(this);
}

export const COUNT = 10;
export default User;

// export { User as default, COUNT };
// export { User as default, COUNT as count };

console.log("export.js");

// const BOOL = false;
// export BOOL; // Declaration or statement expected.
