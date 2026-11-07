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

// [START cloudresourcemanager_v3_tagbindings_effectivetags_list]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
)

// listEffectiveTags lists effective tags directly attached to or inherited by a resource.
func listEffectiveTags(ctx context.Context, w io.Writer, parent string) error {
	client, err := cloudresourcemanager.NewTagBindingsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagBindingsClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.ListEffectiveTagsRequest{
		Parent: parent,
	}

	it := client.ListEffectiveTags(ctx, req)
	for {
		effectiveTag, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Tag Key: %s, Tag Value: %s (Inherited: %t)\n", effectiveTag.GetTagKey(), effectiveTag.GetTagValue(), effectiveTag.GetInherited())
	}

	return nil
}

// [END cloudresourcemanager_v3_tagbindings_effectivetags_list]
