import z from "zod";

import env from "@/types/env";
import { GithubUser } from "@/types/user";

const PageInfo = z.object({
  endCursor: z.string(),
  hasNextPage: z.boolean(),
});

function query(cursor: string) {
  const afterCusrsor = cursor ? `, after: "${cursor}"` : "";
  return `
    {
      viewer {
        following(first: 100${afterCusrsor}) {
          nodes {
            id
            name
            login
            bio
            email
            location
            company
            url
            avatarUrl
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;
}

async function fetchOnePageUsers(cursor: string) {
  try {
    const result = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: query(cursor) }),
    }).then((res) => res.json());

    return z.object({ nodes: z.array(GithubUser), pageInfo: PageInfo }).parse(result.data.viewer.following);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user info");
  }
}

export default async function getFollowers() {
  let users = [];
  let pageInfo = { endCursor: "", hasNextPage: true };
  while (pageInfo.hasNextPage) {
    const result = await fetchOnePageUsers(pageInfo.endCursor);
    users.push(...result.nodes);
    pageInfo = result.pageInfo;
  }

  return users;
}
