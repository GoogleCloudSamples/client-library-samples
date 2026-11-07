// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START artifactregistry_v1beta2_artifactregistry_tags_list]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
	"google.golang.org/api/iterator"
)

// listTags lists the tags associated with a package in an Artifact Registry repository.
func listTags(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, packageID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s", projectID, locationID, repositoryID, packageID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.ListTagsRequest{
		Parent: parent,
	}

	it := client.ListTags(ctx, req)
	for {
		tag, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTags iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Tag: %s, Version: %s\n", tag.GetName(), tag.GetVersion())
	}

	return nil
}

// [END artifactregistry_v1beta2_artifactregistry_tags_list]
