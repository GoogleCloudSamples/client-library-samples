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

// [START cloudresourcemanager_v3_tagvalues_tagvalues_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
)

// listTagValues lists the direct TagValues of an existing parent TagKey.
// parent specifies the resource name of the parent TagKey, for example "tagKeys/123456789012".
func listTagValues(ctx context.Context, w io.Writer, parent string) error {
	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.ListTagValuesRequest{
		Parent: parent,
	}

	it := client.ListTagValues(ctx, req)
	for {
		tagValue, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "TagValue: %s (ShortName: %s)\n", tagValue.GetName(), tagValue.GetShortName())
	}

	return nil
}

// [END cloudresourcemanager_v3_tagvalues_tagvalues_list]
