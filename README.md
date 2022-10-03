# BYOS

### Code Practices

- No file should exceed 120 Lines (We will try our best to adhere by this rule :p )
- We should `type` everything! No `any` types
- `services` is the folder where we will keep interactions like fetching from other APIs, for example S3
- If a `component` itself interacts with other APIs we can add its own `services` folder inside it too. 
- If a `component` uses `react-hooks` define them inside a hooks folder in that `component`'s folder
- All application level `contexts` should be defined in the contexts folder