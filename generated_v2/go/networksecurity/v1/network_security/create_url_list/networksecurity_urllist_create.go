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

// [START networksecurity_v1_networksecurity_urllist_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createUrlList creates a URL list resource in Network Security.
func createUrlList(ctx context.Context, w io.Writer, projectID string, locationID string, urlListID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	urlList := &networksecuritypb.UrlList{
		Values: []string{
			"example.com",
			"example.org",
		},
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("networksecurity.NewClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateUrlListRequest{
		Parent:    parent,
		UrlListId: urlListID,
		UrlList:   urlList,
	}

	op, err := client.CreateUrlList(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateUrlList: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created URL list: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_urllist_create]
